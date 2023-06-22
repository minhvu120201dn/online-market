import bcrypt


class PasswordHashing:
    def hash(password:str):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
        return hashed_password.decode("utf-8")
    
    def verify(entered_password:str, hashed_password:str):
        return bcrypt.checkpw(entered_password.encode("utf-8"), hashed_password.encode("utf-8"))