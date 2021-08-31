from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, TextAreaField, SelectField, IntegerField, DecimalField
from wtforms.validators import InputRequired, EqualTo

class SignIn(FlaskForm):#this will be more complicated #Derek is gonna do it at some point tho
    username = StringField('Username:',validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    submit = SubmitField('Submit')

class SignUp(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    password2 = PasswordField('Confirm password:', validators=[InputRequired(), EqualTo('password')])
    submit = SubmitField('Submit')

class LevelForm(FlaskForm):
    level = SelectField('What level do you wish to play', choices=[('easy','Easy'),('medium','Medium'),('hard','Hard')])
    submit = SubmitField('Submit')
class HeroForm(FlaskForm):
    hero = SelectField('What hero do you want to play', choices=[('blue','Blue'),('knight','Knight'),('huntress','Huntress')])
    submit = SubmitField('Submit')