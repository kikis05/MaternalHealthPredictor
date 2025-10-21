import pandas as pd
import xgboost as xgb

from flask import request, jsonify
from config import app, db
from models import Diagnosis



@app.route("/diagnoses", methods = ["GET"])
def get_reviews():
    diagnoses = Diagnosis.query.all()
    json_diagnoses = list(map(lambda x: x.to_json(), diagnoses))
    return jsonify({"diagnoses": json_diagnoses})

@app.route("/add_diagnosis", methods = ["POST"])
def add_review():
    time = request.json.get("Time")[:24]
    name = request.json.get("Name")
    age = request.json.get("Age")
    systolic_bp = request.json.get("SystolicBP")
    diastolic_bp = request.json.get("DiastolicBP")
    blood_sugar = request.json.get("BloodSugar")
    body_temp = request.json.get("BodyTemp")
    heart_rate = request.json.get("HeartRate")

    try:
        df = pd.DataFrame({
            'Age': [float(age)],
            'SystolicBP': [float(systolic_bp)],
            'DiastolicBP': [float(diastolic_bp)],
            'BS' : [float(blood_sugar)],
            'BodyTemp': [float(body_temp)],
            'HeartRate' : [float(heart_rate)],
        })
    except Exception as e:
        return jsonify({"message": "Incorrect input format."}), 400

    model = xgb.XGBClassifier()
    model.load_model('ml/maternal_health_model.bin')
    risk_level = model.predict(df)[0]
    
    new_diagnosis = Diagnosis(
        time = time,
        name = name,
        age = age,
        systolic_bp = systolic_bp,
        diastolic_bp = diastolic_bp,
        blood_sugar = blood_sugar,
        body_temp = body_temp,
        heart_rate = heart_rate,
        risk_level = risk_level)
    try: 
        db.session.add(new_diagnosis)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Diagnosis Added"}), 201
    
@app.route("/delete_diagnosis/<int:review_id>", methods = ["DELETE"])
def delete_review(review_id):
    review = Diagnosis.query.get(review_id)
    if not review:
        return jsonify({"message" : "Diagnosis not found."}), 404
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message" : "Diagnosis was deleted"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)