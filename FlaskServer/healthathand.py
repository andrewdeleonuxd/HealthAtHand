# -*- coding: utf-8 -*-
"""
Created on Oct 1 13:56:38 2018

@author: ANDREW DELEON
"""

from flask import Flask, request
import pymysql
import json
from nutritionix import NutritionixClient
from itertools import groupby
from operator import itemgetter
 
nutritionix = NutritionixClient(
    application_id='3120369d',
    api_key='752479ae6aeaba04d3422d76abaaafad',
    # debug=True, # defaults to False
)

app = Flask(__name__)

conn = pymysql.connect(
    host = 'sis-teach-01.sis.pitt.edu',
    port = 3306,
    user = 'healthathand',
    passwd = 'H3lth@Hand!',
    db = 'healthathand'
)

#MAKES ALL DATES SERIALIZABLE TO JSON OBJECTS
from datetime import date, datetime
def dtToISOstr(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))


# GET: Returns success if the user email and password match the user email and password in the database.
@app.route('/login', methods=['GET'])
def login():
    jsondata = {}
    code = {}

    email = request.args['emailId']
    password = request.args['password']

    sqlQuery = "SELECT user_id, health_coach_id FROM user where email = " + "'" + email + "'" + " AND password= " + "'" + password + "'" + ";"
    cur = conn.cursor()
    cur.execute(sqlQuery.format("shreya@gmail.com", "password"))
    cur.close()

    colname = ['userId', 'healthCoach']
    result = cur.fetchone()
    login = dict(zip(colname, result))

    sql_getCoachEmail = "SELECT email FROM health_coach WHERE health_coach_id = %s;"
    sql_hcEmail = conn.cursor()
    sql_hcEmail.execute(sql_getCoachEmail, login['healthCoach'])
    sql_hcEmail.close()

    colnameCoach = ['coachEmail']
    fetchCoach = sql_hcEmail.fetchone()
    dataCoach = dict(zip(colnameCoach, fetchCoach))

    if result:
        code['code'] = '200'
        code['message'] = 'Success! We found you in our Database'
    else:
        code['code'] = '400'
        code['message'] = 'Error Connecting to DB or user not found'

    jsondata['code'] = code['code']
    jsondata['message'] = code['message']

    data = {}
    data['login'] = login
    data['coachEmail'] = dataCoach
    jsondata['data'] = data;
    print(jsondata)
    return (json.dumps(jsondata))


# GET: Grabs the user's current calories and total calories from the database, sending both to the front end.
@app.route('/dashboard', methods=['GET'])
def dashboard():
    jsondata = {}
    code = {}
    dataCal = {}
    dataDur = {}

    userId = request.args['userId']
    date = request.args['date']

    sql = "SELECT remaining_cal, max_cal FROM daily_cal AS d JOIN max_cal AS m ON d.user_id = m.user_id WHERE d.user_id = " + userId + " AND d.day = '" + date + "';"
    cal = conn.cursor()
    cal.execute(sql)
    cal.close()

    colname = ['remainingCal', 'totalCal']
    fetchcal = cal.fetchone()
    dataCal = dict(zip(colname, fetchcal))

    sql_dur = "SELECT total_week_min, max_min FROM weekly_exercise AS d JOIN max_exercise AS m ON d.user_id = m.user_id WHERE d.user_id = " + userId + " AND d.week_start <= '" + date + "' AND d.week_end > '" + date + "';"
    exc = conn.cursor()
    exc.execute(sql_dur)
    exc.close()

    colnameDur = ['remainingDuration', 'totalDuration']
    fetchDur = exc.fetchall()
    print(fetchDur)
    dataDur = dict(zip(colnameDur, fetchDur))

    if cal.execute:
        code['code'] = '200'
        code['message'] = 'Success! Pulled the calorie and exercise goals'
    else:
        code['code'] = '400'
        code['message'] = 'Error Connecting to DB'

    jsondata['code'] = code['code']
    jsondata['message'] = code['message']

    data = {}
    data['calorieGoals'] = dataCal
    data['exerciseGoals'] = dataDur

    jsondata['data'] = data

    print(jsondata)

    return (json.dumps(jsondata,default=dtToISOstr))

#GET: NUTRITION IX API SEARCH ENDPOINT
#SUPPORTS ENTRIES FOR BRAND SEARCHING SUCH AS "ARGO CORN STARCH, MINUTE MAID ORANGE JUICE, ETC"
@app.route('/search', methods = ['GET'])
def search():
    jsondata = {}
    code = {}
    f = request.args['food']
    s = nutritionix.search(query=f)
    
    if s:
        code['code'] = '200'
        code['message'] = 'Success! NutritonIX is working and we got a branded search'
    else:
        code['code'] = '400'
        code['message'] = 'Error Connecting to NutritionIX'

    jsondata['code'] = code['code']
    jsondata['message'] = code['message']
    jsondata['data'] = s
    
    return (json.dumps(jsondata))

#GET: NUTRITION IX API NUTRITION ENDPOINT.
#SUPPORTS ENTRIES SUCH AS "TODAY, I ATE 1 EGG AND 2 SLICES OF BACON" & CONVERTS IT INTO JSON
@app.route('/nut', methods= ['GET'])
def nutrient():
    jsondata = {}
    code = {}
    f = request.args['food']
    n = nutritionix.natural(query=f)
    
    if n:
        code['code'] = '200'
        code['message'] = 'Success! NutritonIX is working and we got a natural search result'
    else:
        code['code'] = '400'
        code['message'] = 'Error Connecting to NutritionIX'

    jsondata['code'] = code['code']
    jsondata['message'] = code['message']
    jsondata['data'] = n
    
    return (json.dumps(jsondata))

##SUPPORTS ENTRIES SUCH AS "TODAY, I RAN 10 MILES OR TODAY, I DID SPIN CLASS FOR 45 MINUTES" & CONVERTS IT INTO JSON
@app.route('/exercise', methods= ['GET'])
def exercise():
    jsondata = {}
    code = {}
    ex = request.args['exercise']
    e = nutritionix.exercise(query=ex)
    
    #Case where search is empty
    if e:
        code['code'] = '200'
        code['message'] = 'Success! NutritonIX is working and we got an exercise result'
    else:
        code['code'] = '400'
        code['message'] = 'Error Connecting to NutritionIX'

    jsondata['code'] = code['code']
    jsondata['message'] = code['message']
    jsondata['data'] = e
    
    return (json.dumps(jsondata))
    
#GET: Returns the food diary for the day to the front end.
#POST: INSERT the food diary for the day
#PUT: UPDATES an existing diary
@app.route('/mealnotes', methods=['GET', 'POST', 'PUT'])
def foodDiary():
    
    if request.method == 'GET':
        jsondata = {}
        code={}
        data={}
        
        user_id = request.args['userId']
        date = request.args['date']
        
        mnote = conn.cursor()
        SEL_foodnote = "SELECT day, food_notes FROM food_note WHERE user_id= %s AND day = %s;"
        mnote.execute(SEL_foodnote, (user_id, date))

        colnames = ['date', 'note']
        mn = mnote.fetchall()
        data = list(map(lambda x:dict(zip(colnames,x)), mn))
        
        if mnote.execute:
            code['code'] = '200'
            code['message'] = 'Success GETTING food notes!'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB to GET food notes'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
          
        jsondata['data'] = data
    
        return(json.dumps(jsondata,default=dtToISOstr))
        
    elif request.method == 'POST':
        jsondata = {}
        code = {}
        user_id = request.json["userId"]
        date = request.json["date"]
        note = request.json["note"]

        postnote = conn.cursor()
        INS_foodnote = "INSERT INTO food_note VALUES (%s, %s, %s);"
        postnote.execute(INS_foodnote, (user_id, date, note))
        conn.commit()

        if postnote.execute:
            code['code'] = '200'
            code['message'] = 'Success! INSERTED a new food note!'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB to INSERT food note.'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    elif request.method == 'PUT':
        jsondata = {}
        code = {}
        user_id = request.json['userId']
        date = request.json['date']
        note = request.json['note']
        
        putnote = conn.cursor()
        UPD_foodnote = "UPDATE food_note SET user_id = %s, day = %s, food_notes = %s WHERE user_id = %s AND day = %s;"
        putnote.execute(UPD_foodnote, (user_id, date, note, user_id, date))
        conn.commit()


        if putnote.execute:
            code['code'] = '200'
            code['message'] = 'Success! UPDATED a new food note!'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB to UPDATE food note.'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    else:
        jsondata = {}
        code = {}
        code['code'] = '400'
        code['message'] = 'Error getting to endpoint'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))

#GET: Returns the food diary for the day to the front end.
#POST: INSERTS the food diary for the day, replacing what is there, even if it is null.
#UPDATE: UPDATES an existing diary in the database if edited.
@app.route('/exernotes', methods=['GET', 'POST', 'PUT'])
def exerciseDiary():  
    if request.method == 'GET':
        jsondata = {}
        code={}
        data={}        
        
        user_id = request.args['userId']
        date = request.args['date']
        
        mnote = conn.cursor()
        SEL_foodnote = "SELECT day, exercise_notes FROM exercise_note WHERE user_id= %s AND day = %s;"
        mnote.execute(SEL_foodnote, (user_id, date))
    
        colnames = ['date', 'note']
        mn = mnote.fetchall()
        data = list(map(lambda x:dict(zip(colnames,x)), mn))
        
        if mnote.execute:
            code['code'] = '200'
            code['message'] = 'Query success, exercise diary pulled'
        else:
            code['code'] = '400'
            code['message'] = 'Error pulling exercise diary.. cant connect to DB'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
          
        jsondata['data'] = data
    
        return(json.dumps(jsondata,default=dtToISOstr))
        
    elif request.method == 'POST':
        jsondata = {}
        code={}
        data={}
        
        user_id = request.json['userId']
        date = request.json['date']
        note = request.json['note']
        
        postexnote = conn.cursor()
        INS_exernote = "INSERT INTO exercise_note VALUES (%s, %s, %s);"
        postexnote.execute(INS_exernote, (user_id, date, note))
        conn.commit()
        
        if postexnote.execute:
            code['code'] = '200'
            code['message'] = 'Query success, exercise diary INSERTED'
        else:
            code['code'] = '400'
            code['message'] = 'Error INSERTING exercise diary.. cant connect to DB'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    elif request.method == 'PUT':
        jsondata = {}
        code={}
        data={}
        
        user_id = request.json['userId']
        date = request.json['date']
        note = request.json['note']
        
        postexnote = conn.cursor()
        UPD_exernote = "UPDATE exercise_note SET user_id = %s, day = %s, exercise_notes = %s WHERE user_id = %s AND day >= %s;"
        postexnote.execute(UPD_exernote, (user_id, date, note, user_id, date))
        conn.commit()
        
        if postexnote.execute:
            code['code'] = '200'
            code['message'] = 'Query success, exercise diary UPDATED'
        else:
            code['code'] = '400'
            code['message'] = 'Error updating exercise diary.. cant UPDATE to DB'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
          
        jsondata['data'] = data
        
        return(json.dumps(jsondata))
        
    else:
        jsondata = {}
        code = {}
            
        code['code'] = '400'
        code['message'] = 'Error for exercise diary, cant connect to DB'
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))

# GET: Returns all of the user's weights
@app.route('/report', methods=['GET', 'POST', 'PUT'])
def report():
    
    if request.method == 'GET':
        jsondata = {}
        code = {}
    
        userId = request.args['userId']
    
        colnames = ['weight', 'date']
        report = conn.cursor()
        report.execute('''SELECT weight, DATE_FORMAT(day, '%Y-%m-%d') AS day FROM daily_weight WHERE user_id = ''' + userId +''';''')
        report.close()
    
        rp = report.fetchall()
        weights = list(map(lambda x: dict(zip(colnames, x)), rp))
    
        if report.execute:
            code['code'] = '200'
            code['message'] = 'Success! We pulled all weights'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB or error querying'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
    
        jsondata['data'] = weights
    
        return (json.dumps(jsondata, default=dtToISOstr))
    
    elif request.method == 'POST':
        jsondata = {}
        code={}

        user_id = request.json['userId']
        weight = request.json['weight']
        
        postweight = conn.cursor()
        INS_weight = "INSERT INTO daily_weight VALUES(%s, CURDATE(), %s);"
        postweight.execute(INS_weight, (user_id, weight))
        conn.commit()
        
        if postweight.execute:
            code['code'] = '200'
            code['message'] = 'Success! INSERTED values into daily weight'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant insert into daily weight'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    elif request.method == 'PUT':
        jsondata = {}
        code={}

        user_id = request.json['userId']
        weight = request.json['weight']
        
        postweight = conn.cursor()
        UPD_weight = "UPDATE daily_weight SET user_id = %s, day = CURDATE(), weight = %s WHERE user_id = %s AND day = CURDATE();"
        postweight.execute(UPD_weight, (user_id, weight, user_id))
        conn.commit()
        
        if postweight.execute:
            code['code'] = '200'
            code['message'] = 'Success! UPDATED values into daily weight'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant update daily weight'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    else:
        jsondata = {}
        code = {}
            
        code['code'] = '400'
        code['message'] = 'Error for daily_weight, cant do anything'
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
#GET: Returns success if the user email and password match the user email and password in the database.
@app.route('/email', methods=['POST'])
def emailPost():
    jsondata = {}
    code={}
    
    user_id = request.json['userId']
    date = request.json['date']
    subject = request.json ['subject']
    email_body = request.json ['emailBody']

    cur = conn.cursor()
    INS_email = "INSERT INTO email VALUES (%s, %s, %s, %s);"
    cur.execute(INS_email, (user_id, date, subject, email_body))
    conn.commit()
    
    if cur.execute:
        code['code'] = '200'
        code['message'] = 'Success! Added new email'
    else:
        code['code'] = '400'
        code['message'] = 'Error Connecting to DB to insert new email'
    
    jsondata['code'] = code['code']
    jsondata['message'] = code['message']

    return(json.dumps(jsondata))
        
#GET: Returns ALL food items that made up a meal (That the user themselves selected)
#POST: Inserts a new meal to both the food log and meal log tables
@app.route('/meallog', methods=['GET', 'POST', 'PUT', 'DELETE'])
def mealLog():

    if request.method == 'GET':
        jsondata = {}
        code={}
    
        user_id = request.args['userId']
        date = request.args ['date']
        
        colnames = ['cart_id', 'cart_name', 'id', 'foodname', 'numCal', 'servingSize', 'servingSizeUnit', 'totalCalories']
        sqlGetMealLog = conn.cursor()
        SEL_meal = "SELECT user_cart.cart_id, cart_name, food_id, food_name, numCal, food_qty, food_qty_unit, totalCalories FROM user_cart, food_log WHERE user_cart.cart_id = food_log.cart_id AND user_cart.user_id = %s AND DATE(user_cart.datetime) = %s;"
        sqlGetMealLog.execute(SEL_meal, (user_id, date))
        conn.commit()
    
        fetchml = sqlGetMealLog.fetchall()
        meals = []
        
        for cartid, iters in groupby(fetchml, itemgetter(0)):
            dic1={}
            dic1['cartId'] = cartid
            dic1['food']=[]
            for i in iters:
                dic1['mealName'] = i[1]
                x = list(i)[2:]
                dic1['food'].append(dict(zip(colnames[2:],x)))
            meals.append(dic1)
            
        if sqlGetMealLog.execute:
            code['code'] = '200'
            code['message'] = 'Success! We pulled both the entire food inside the meal'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB!'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
    
        jsondata['data'] = {}
        jsondata['data'] = meals
        
        return(json.dumps(jsondata,default=dtToISOstr))
        
    elif request.method == 'POST':
        jsondata = {}
        code={}
        
        #with open('inc.json') as json_data:
            #d = json.load(json_data)
            #print(d)
        user_id = request.json['userId']
        date = request.json['date']
        cartCalories = request.json['cartCal']
        mealName = request.json['mealData']['mealName']
        
        foodlist = request.json['mealData']['food']        
        
        postmeal = conn.cursor()
        INS_meal = "INSERT INTO user_cart (user_id, datetime, cart_name, cart_cal) VALUES (%s, %s, %s, %s);"
        postmeal.execute(INS_meal, (user_id, date, mealName, cartCalories))
        conn.commit()        
        postmeal.execute("select LAST_INSERT_ID();")
        SEL_MEAL_ID = postmeal.fetchone()[0]
        
        food_str = ""
        for food in foodlist:
            food_str+="({}, '{}', \"{}\", {}, {}, '{}', {}), ".format(SEL_MEAL_ID, food['id'], food['foodname'], food['numCal'], food['servingSize'], food['servingSizeUnit'], food['totalCalories'])
            
            
        postfood = conn.cursor()
        INS_food = "INSERT INTO food_log VALUES {};".format(food_str[:-2]) # To exclude the last comma in the food string
        postfood.execute(INS_food)
        conn.commit()   
        
        if postfood.execute and postmeal.execute:
            code['code'] = '200'
            code['message'] = 'Success! INSERTED values into both food_log and user_cart'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant insert into food_log and-or user_cart'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))

    elif request.method == 'PUT':
        jsondata = {}
        code={}
        
        cart_id = request.json['mealData']['cartId']
        user_id = request.json['userId']
        date = request.json['date']
        cartCalories = request.json['cartCal']
        
        mealName = request.json['mealData']['mealName']
        foodlist = request.json['mealData']['food'] 
        
        #add back the calories to remaining cal before doing anything
        '''
        selremcal= conn.cursor()
        SEL_Cal = "SELECT cart_cal FROM user_cart WHERE cart_id = %s;"
        selremcal.execute(SEL_Cal, (cart_id))
        cartCal = selremcal.fetchone()[0]
        print (cartCal)
        
        getremcal= conn.cursor()
        GET_Cal = "SELECT remaining_cal from daily_cal where user_id = %s and day = %s;"
        getremcal.execute(GET_Cal, (user_id, date))
        remCal = getremcal.fetchone()[0]
        print (remCal)
        
        remCal += cartCal
        remCal -= cartCalories
        postCal = conn.cursor()
        POST_Cal = "UPDATE daily_cal SET remaining_cal = %s where user_id= %s and day = %s;"
        postCal.execute(POST_Cal, (remCal, user_id, date))
        print (remCal)
        conn.commit()
        '''

        #first delete the foods attached to the cart
        deletefood = conn.cursor()
        DEL_food = "DELETE FROM food_log WHERE cart_id = %s;"
        deletefood.execute(DEL_food, (cart_id))
        conn.commit()

        food_str = ""
        for food in foodlist:
            print (food)
            food_str+="({}, \"{}\", \"{}\", {}, {}, \"{}\", {}), ".format(cart_id, food['id'], food['foodname'], food['numCal'], food['servingSize'], food['servingSizeUnit'], food['totalCalories'])
            
        postfood = conn.cursor()
        INS_food = "INSERT INTO food_log VALUES {};".format(food_str[:-2]) # To exclude the last comma in the food string
        postfood.execute(INS_food)
        conn.commit()   
        
        putmeal = conn.cursor()
        UPD_meal = "UPDATE user_cart SET cart_name = %s, cart_cal = %s where cart_id = %s AND user_id = %s AND datetime = %s;"
        putmeal.execute(UPD_meal, (mealName, cartCalories, cart_id, user_id, date))
        conn.commit()     
        
        if putmeal.execute:
            code['code'] = '200'
            code['message'] = 'Success! Updated Cart Name'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant Update Cart Name'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    elif request.method == 'DELETE':
        jsondata={}
        code = {}
        
        user_id = request.args['userId']
        cart_id = request.args['cartId']
        date = request.args['date']
        '''
        #add back the calories to remaining cal before doing anything
        selCartCal= conn.cursor()
        SEL_cartCal = "SELECT cart_cal FROM user_cart WHERE cart_id = %s;"
        selCartCal.execute(SEL_cartCal, (cart_id))
        cartCal = selCartCal.fetchone()[0]
        print (cartCal)
        
        selRemCal= conn.cursor()
        SEL_remCal = "SELECT remaining_cal from daily_cal where user_id = %s and day = %s;"
        selRemCal.execute(SEL_remCal, (user_id, date))
        remCal = selRemCal.fetchone()[0]
        print (remCal)
        
        remCal += cartCal
        postCal = conn.cursor()
        POST_Cal = "UPDATE daily_cal SET remaining_cal = %s where user_id= %s and day = %s;"
        postCal.execute(POST_Cal, (remCal, user_id, date))
        print (remCal)
        conn.commit()
        '''
        #first delete the foods attached to the cart
        deletefood = conn.cursor()
        DEL_food = "DELETE FROM food_log WHERE cart_id = %s;"
        deletefood.execute(DEL_food, (cart_id))
        conn.commit()
        #then delete the cart itself
        deletemeal = conn.cursor()
        DEL_meal = "DELETE FROM user_cart WHERE cart_id = %s AND user_id = %s;"
        deletefood.execute(DEL_meal, (cart_id, user_id))
        conn.commit()
        
        if deletefood.execute and deletemeal.execute:
            code['code'] = '200'
            code['message'] = 'Success! DELETED values from both food_log and user_cart'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant delete from food_log and-or user_cart'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
        
    else:
        jsondata = {}
        code={}           
        code['code'] = '400'
        code['message'] = 'Error Connecting to DB! Cant do anything'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
    
#GET: Returns the exercise log
#POST: Inserts a new entry in the exercise log
@app.route('/exerlog', methods=['GET', 'POST', 'PUT', 'DELETE'])
def exerLog():

    if request.method == 'GET':
        jsondata = {}
        code={}
        
        user_id = request.args['userId']
        date = request.args['date']
        
        colnames = ['exid', 'exName', 'duration', 'intensity']
        sqlGetExerLog = conn.cursor()

        sqlGetExerLog.execute('''SELECT exercise_id, exercise_name, duration, intensity, user_id, day
                              FROM exercise_log
                              WHERE user_id = '''+user_id+'''
                              AND day = '''+"'"+date+"'"+''';''')
    
        fetchexlog = sqlGetExerLog.fetchall()
        el = list(map(lambda x:dict(zip(colnames,x)), fetchexlog))
        
        if sqlGetExerLog.execute:
            code['code'] = '200'
            code['message'] = 'Success! We pulled both the entire exercise log'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB!'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
    
        jsondata['data'] = []
        jsondata['data'] = el
        
        return(json.dumps(jsondata, default=dtToISOstr))
        
    elif request.method == 'POST':
        jsondata = {}
        code={}
    
        user_id = request.json['userId']
        date = request.json['date']
        exercise = request.json['exercise']
        exercise_id = exercise['exid']
        exercise_name = exercise['exName']
        intensity = exercise['intensity']
        duration = exercise['duration']
        
        postexercise = conn.cursor()
        INS_exercise = "INSERT INTO exercise_log VALUES (%s, %s, %s, %s, %s, %s);"
        postexercise.execute(INS_exercise, (exercise_id, exercise_name, duration, intensity, user_id, date))
        conn.commit()

        if postexercise.execute:
            code['code'] = '200'
            code['message'] = 'Success! INSERTED values into the exercise_log table'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant insert into exercise_log'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    elif request.method == 'PUT':
        jsondata = {}
        code={}
    
        user_id = request.json['userId']
        date = request.json['date']
        exercise = request.json['exercise']
        exercise_id = exercise['exid']
        exercise_name = exercise['exName']
        intensity = exercise['intensity']
        duration = exercise['duration']
        
        updateexercise = conn.cursor()
        UPD_exercise = "UPDATE exercise_log SET exercise_name= %s, duration= %s, intensity= %s, user_id = %s, day= %s WHERE exercise_id = %s;"
        updateexercise.execute(UPD_exercise, (exercise_name, duration, intensity, user_id, date, exercise_id))
        conn.commit()
        
        if updateexercise.execute:
            code['code'] = '200'
            code['message'] = 'Success! UPDATED values into the exercise_log table'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant update into exercise_log'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    elif request.method == 'DELETE':
        jsondata={}
        code = {}
        
        user_id= request.args['userId']
        date = request.args['date']
        exid = request.args['exid']
        
        deleteexercise = conn.cursor()
        DEL_exercise = "DELETE FROM exercise_log WHERE user_id = %s AND day= %s AND exercise_id = %s;"
        deleteexercise.execute(DEL_exercise, (user_id, date, exid))
        conn.commit()
        
        if deleteexercise.execute:
            code['code'] = '200'
            code['message'] = 'Success! DELETED values exercise log'
        else:
            code['code'] = '400'
            code['message'] = 'Error Connecting to DB. Cant delete from exercise log'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
        
    else:
        jsondata = {}
        code={}           
        code['code'] = '400'
        code['message'] = 'Error Connecting to DB! Cant do anything for exercise log'
    
        jsondata['code'] = code['code']
        jsondata['message'] = code['message']
        
        return(json.dumps(jsondata))
    
if __name__ == '__main__':
    app.run(debug=True)