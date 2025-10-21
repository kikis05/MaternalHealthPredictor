from config import db
    
class Diagnosis(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    time = db.Column(db.String, unique = False, nullable = False)
    name = db.Column(db.String, unique = True, nullable = False)
    age = db.Column(db.Integer, unique = False, nullable = False)
    systolic_bp = db.Column(db.Double, unique = False, nullable = False)
    diastolic_bp = db.Column(db.Double, unique = False, nullable = False)
    blood_sugar = db.Column(db.Double, unique = False, nullable = False)
    body_temp = db.Column(db.Double, unique = False, nullable = False)
    heart_rate = db.Column(db.Double, unique = False, nullable = False)
    risk_level = db.Column(db.Double, unique = False, nullable = False)

    def to_json(self):
        return{
            "id" : self.id,
            "Time": self.time,
            "Name" : self.name,
            "Age" : self.age,
            "SystolicBP" : self.systolic_bp,
            "DiastolicBP" : self.diastolic_bp,
            "BloodSugar": self.blood_sugar,
            "BodyTemp" : self.body_temp,
            "HeartRate" : self.heart_rate,
            "RiskLevel" : self.risk_level
        }
    def only_score(self):
        return self.score

    

    