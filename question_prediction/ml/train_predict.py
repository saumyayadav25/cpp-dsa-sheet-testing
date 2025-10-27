# ml/train_predict.py
"""
Train a small ML model for predicting DSA questions solved.
Generates:
 - public/ml/model.pkl          (best trained model)
 - public/ml/prediction.json    (example predictions + metrics)
 - public/ml/prediction_plot.png (scatter plot of actual vs predicted)
"""

import json
from pathlib import Path
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import pickle
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore")

# --- output directory ---
ROOT = Path(__file__).resolve().parents[1]  # project root
OUT_DIR = ROOT / "public" / "ml"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# --- 1. Create dummy dataset ---
def make_dummy_dataset(n=800, random_state=42):
    rng = np.random.RandomState(random_state)
    streak = rng.poisson(3, size=n).clip(0, 30)
    avg_daily_solved = (rng.normal(1.2, 1.0, size=n) + 0.5 * (streak / 10)).clip(0, 10)
    weekly_active_days = rng.binomial(7, p=(0.2 + 0.02*streak), size=n).clip(0, 7)
    current_progress = (rng.beta(2, 5, size=n) * 100).clip(0, 100)
    total_solved = (rng.poisson(200, size=n) + (current_progress * 2)).astype(float)
    
    # target: next 7 days solved
    base = (avg_daily_solved * 7) * (1 + 0.05 * streak)
    progress_penalty = (1 - (current_progress / 200))
    seasonal = 1 + 0.1 * (weekly_active_days / 7)
    target = (base * progress_penalty * seasonal)
    noise = rng.normal(0, 3, size=n)
    target = (target + noise).clip(0).round(2)
    
    df = pd.DataFrame({
        "streak": streak,
        "avg_daily_solved": np.round(avg_daily_solved, 3),
        "weekly_active_days": weekly_active_days,
        "current_progress": np.round(current_progress, 2),
        "total_solved": total_solved,
        "next_7_days": target
    })
    return df

# --- 2. Train models ---
def train_and_save(df):
    features = ["streak", "avg_daily_solved", "weekly_active_days", "current_progress", "total_solved"]
    X = df[features].values
    y = df["next_7_days"].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

    models = {
        "LinearRegression": LinearRegression(),
        "DecisionTree": DecisionTreeRegressor(max_depth=6, random_state=1)
    }

    results = {}
    for name, model in models.items():
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        r2 = r2_score(y_test, preds)
        mae = mean_absolute_error(y_test, preds)
        mse = mean_squared_error(y_test, preds)
        results[name] = {"model": model, "r2": r2, "mae": mae, "mse": mse}

    # choose best model
    best_name = max(results.keys(), key=lambda k: results[k]["r2"])
    best_model = results[best_name]["model"]

    # save model
    with open(OUT_DIR / "model.pkl", "wb") as f:
        pickle.dump(best_model, f)

    # example predictions
    examples = [
        {"label": "casual_user", "streak": 0, "avg_daily_solved": 0.3, "weekly_active_days": 1, "current_progress": 12.0, "total_solved": 15},
        {"label": "consistent_beginner", "streak": 5, "avg_daily_solved": 0.8, "weekly_active_days": 4, "current_progress": 30.0, "total_solved": 60},
        {"label": "fast_learner", "streak": 12, "avg_daily_solved": 3.0, "weekly_active_days": 7, "current_progress": 55.0, "total_solved": 300},
        {"label": "power_user", "streak": 25, "avg_daily_solved": 5.2, "weekly_active_days": 7, "current_progress": 85.0, "total_solved": 1200},
        {"label": "current_user_example", "streak": 3, "avg_daily_solved": 1.5, "weekly_active_days": 3, "current_progress": 22.0, "total_solved": 80}
    ]
    X_examples = np.array([[e["streak"], e["avg_daily_solved"], e["weekly_active_days"], e["current_progress"], e["total_solved"]] for e in examples])
    preds_examples = best_model.predict(X_examples).round(2)
    for e, p in zip(examples, preds_examples):
        e["predicted_next_7_days"] = float(max(0, p))

    # metrics
    metrics = {
        "best_model": best_name,
        "r2": results[best_name]["r2"],
        "mae": results[best_name]["mae"],
        "mse": results[best_name]["mse"],
        "all_models": {k: {"r2": results[k]["r2"], "mae": results[k]["mae"], "mse": results[k]["mse"]} for k in results}
    }

    # save JSON
    payload = {"metrics": metrics, "example_predictions": examples}
    with open(OUT_DIR / "prediction.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

    # plot actual vs predicted
    preds_test = best_model.predict(X_test)
    plt.figure(figsize=(7,5))
    plt.scatter(y_test, preds_test, alpha=0.6)
    maxv = max(y_test.max(), preds_test.max()) + 2
    plt.plot([0, maxv], [0, maxv], linewidth=1, color='red')  # y=x line
    plt.xlabel("Actual next 7 days")
    plt.ylabel("Predicted next 7 days")
    plt.title(f"Actual vs Predicted ({best_name})")
    plt.tight_layout()
    plt.savefig(OUT_DIR / "prediction_plot.png", dpi=150)
    plt.close()

    print(f"✅ Saved model, JSON, and plot in {OUT_DIR}")

if __name__ == "__main__":
    df = make_dummy_dataset(n=1200)
    train_and_save(df)
