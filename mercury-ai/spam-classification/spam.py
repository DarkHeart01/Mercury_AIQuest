#import required libraries
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score
import xgboost as xgb
import joblib

#storing csv file in a dataframe
dataframe = pd.read_csv('spam.csv')

#TfidfVectorizer used to vectorize a string, and classify words by relevance
vectorizer = TfidfVectorizer(max_features=2000) #2000 ideal for smaller dataset and binary classification

#vectorizer transforms all queries into vectors
#dataframe split into X and y, X-> input feature, y-> output 
X = vectorizer.fit_transform(dataframe['query']) 
y = dataframe['label']

#splitting dataset into 70% train and 30% test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

#initializing XGBCLassifier model
model = xgb.XGBClassifier(random_state = 42, 
                          use_label_encoder = False, 
                          eval_metric = 'logloss')

#defining a parameter grid for GridSearch CV
param_grid = {
    'n_estimators': [50, 100, 200], 
    'learning_rate': [0.01, 0.05, 0.1], 
    'max_depth': [3, 5, 7],  
    'subsample': [0.8, 1.0],  
    'colsample_bytree': [0.8, 1.0],  
    'gamma': [0, 0.1, 0.2],  
}

#fitting GridSearch to training set to determine best hyperparameters
grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=3, n_jobs=-1, verbose=2)
grid_search.fit(X_train, y_train)

#saving best parameters and applying them to training model
best_params = grid_search.best_params_
best_model = grid_search.best_estimator_

#accuracy with GridSearch params
y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
#accuracy score is 96.23%

#trying XGBClassifier without changed hyperparameters
model.fit(X_train, y_train)

#XGBClassifier accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
#accuracy is 96.74%

#choose XGBClassifier without changed hyperparameters for higher accuracy

#saving trained model in pickle file
joblib.dump(model, 'spam_classifier.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')