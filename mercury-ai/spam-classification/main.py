import joblib

model = joblib.load('spam_classifier_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

def classify_query(query):
    query_tfidf = vectorizer.transform([query])
    prediction = model.predict(query_tfidf)

    spam_message = 'Your message looks like spam. Please adhere to company guidelines.'
    nospam_message = 'Good to go!'

    if prediction == 1:
        return nospam_message
    else:
        return spam_message

query = input("Check for spam:")
result = classify_query(query)
print(result)