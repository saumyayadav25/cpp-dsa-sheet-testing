# 🧠 ML-Based DSA Practice Performance Predictor
### 🎯 Overview

This feature introduces a machine learning-based prediction system that estimates how many DSA questions a user is likely to solve in the future based on their past activity and learning consistency.
It helps users track progress, stay motivated, and plan practice sessions efficiently on DSAMate v2.

### ⚙️ Features

✅ Predicts number of questions a user can solve for:

- Next 7 days

- 1 month

- 3 months

- 6 months

- 1 year

### ✅ Uses key user features:

- Streak (days of continuous activity)

- Average daily problems solved

- Weekly active days

- Current progress (%)

- Total problems solved

**✅ Built using sample data to simulate real user behavior.**
**✅ Displays clean visualizations (line/bar charts) for better understanding.**
**✅ Keeps users engaged by showing personalized learning forecasts.**

### 🧩 Tech Stack

1. Python

2. scikit-learn (for ML models)

3. NumPy & Pandas (for data processing)

4. Matplotlib (for visualization)

5. Jupyter Notebook (for interactive predictions)

### 🧠 How It Works

- The model is trained on dummy user data using Linear Regression and Decision Tree Regressor.

- It learns the relationship between activity metrics and the number of questions solved in the future.

- After training, the best model is saved as model.pkl.

- The user can then input their own activity data to get predictions for different future durations.

- Results are displayed through visual graphs showing trends over time.

### 🚀 How to Run
1. Step 1: Train the Model

Run the following script to generate the model and prediction data:
```bash
python ml/train_predict.py
```


This will create:

- public/ml/model.pkl → Saved trained model

- public/ml/prediction.json → Model metrics and example results

- public/ml/prediction_plot.png → Visualization (Actual vs Predicted)

2. Step 2: Run in Jupyter Notebook

Open performance_predictor.ipynb and run all cells.
You’ll be asked to enter:

- Streak (e.g. 5)
- Average problems/day (e.g. 2.5)
- Weekly active days (e.g. 6)
- Current progress (%) (e.g. 40)
- Total solved (e.g. 120)


**Then you’ll see:**

Predicted questions for 7d, 1m, 3m, 6m, 1y

**Visualization graph**

📊 Example Output
Predicted number of questions:
  next_7_days: 35.2
  next_1_month: 151.36
  next_3_months: 454.08
  next_6_months: 908.16
  next_1_year: 1816.32


**📈 Graph: A line plot showing predictions over time.**

### 💡 Impact

This feature adds a data-driven experience to DSAMate — helping users see their growth potential and motivating them to stay consistent.
It also encourages long-term engagement by giving personalized progress predictions.