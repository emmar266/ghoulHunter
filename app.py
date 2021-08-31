from flask import Flask, render_template, redirect, request, g, session, url_for
from database import get_db, close_db
from werkzeug.security import generate_password_hash, check_password_hash
from forms import SignIn, SignUp, LevelForm, HeroForm
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'this-is-my-secret-key'


#So i have the basics of this 
# Now i just need to do a leader board and a landing page
# and connect it to the game
# which i'll need to watch the last lecture to do :(
# tomorrows problem
@app.teardown_appcontext
def close_db_at_end_of_requests(e=None):
    close_db(e)

@app.before_request
def load_logged_in_user():
    g.user=session.get('username', None)


def login_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('signIn', next = request.url))
        return view(**kwargs)
    return wrapped_view

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

@app.route('/signUp', methods=['GET','POST'])
def signUp():
    form = SignUp()
    if form.validate_on_submit():
        username = form.username.data
        username = username.lower()
        password = form.password.data
        password2 = form.password.data
        db = get_db()
        db.execute(''' INSERT INTO users (username, password) VALUES(?,?); ''',(username, generate_password_hash(password)))
        db.commit()
        return redirect(url_for('signIn'))
    return render_template('signUp.html', form=form)

@app.route('/sign_in', methods=['GET','POST'])
def signIn ():
    form = SignIn()
    if form.validate_on_submit():
        username = form.username.data
        username = username.lower()
        password = form.password.data
        db = get_db()
        user = db.execute(''' SELECT * FROM users WHERE username=?; ''',(username,)).fetchone()
        if user is None:
            form.username.errors.append('Unknown username')
        elif not check_password_hash(user['password'],password):
            form.password.errors.append('Incorrect Password')
        else:
            session.clear()
            session['username'] = username
            next_page = request.args.get('next')
            if not next_page:
                next_page = url_for('get_hero')
            return redirect(next_page)
    return render_template('signIn.html', form=form)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/game')
@login_required
def game():
    return render_template('index.html')

# i'm going to change this so that it will only store the score if its greater than the 
# users particular hightest score.
# That way it won't clog up teh scoreboard will only like 
@app.route('/store_score',methods=['POST'])
def store_score():
    score = int(request.form['score'])
    db = get_db()
    if session['username']:
        username = session['username']
        if db.execute(''' SELECT * from score WHERE username=?;''',(username,)).fetchone() is None:
            db.execute('''INSERT INTO score(username,score) VALUES(?,?) ''',(username,score))
            db.commit()
        else:
            previous_score = db.execute(''' SELECT * from score WHERE username=?;''',(username,)).fetchone()['score']
            if score >= previous_score:
                db.execute(''' UPDATE score SET score=? WHERE username=? ''',(score,username))
                db.commit()
    else:
        return redirect(url_for('scoreboard'))
    return 'success'

@app.route('/scoreboard')
def scoreboard():
    #do  a score board
    db = get_db()
    scores = db.execute('''SELECT * FROM score ORDER BY score;''').fetchall()
    return render_template('scoreboard.html', scores=scores)

@app.route('/get_level',methods=['GET','POST'])
@login_required
def get_level():
    form = LevelForm()
    if form.validate_on_submit():
        level = form.level.data
        if 'level' not in session:
            session['level'] = {}
        session['level'] = level
        return redirect(url_for('game'))
    return render_template('level_form2.html',form=form)

@app.route('/level')
def level():
    if session['level'] =={}:
        session['level'] = 'medium'
    level=session['level']
    return level

#I would like to say i don't think this will work :) and yet here we are
@app.route('/get_hero', methods=['GET','POST'])
@login_required
def get_hero():
    form = HeroForm()
    if form.validate_on_submit():
        hero = form.hero.data
        if 'hero' not in session:
            session['hero']  ={}
        session['hero'] = hero
        return redirect(url_for('get_level'))
    return render_template('hero_choice.html', form = form)

@app.route('/hero')
def hero():
    if session['hero'] is None:
        session['hero'] = 'blue'
    hero = session['hero']
    print(session['hero'])
    return hero
