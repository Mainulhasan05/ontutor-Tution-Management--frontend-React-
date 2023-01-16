from flask import Flask,request,jsonify
from flask_cors import CORS
import pymongo
from bson.objectid import ObjectId
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["tutormanagement"]
userTable = mydb["users"]
degreeTable=mydb['degrees']
postTable=mydb['posts']

app=Flask(__name__)
CORS(app)

@app.route("/")
def say_hello():
    return "Hello Bhai"
@app.route("/test",methods=['GET','POST'])
def say_hello2():
    print(request.get_json())
    return "Hello BhaiTest"

@app.route("/register",methods=['GET','POST'])
def register():
    data=request.get_json()
    print(data)
    userTable.insert_one(dict(data))
    return data

@app.route("/get_user",methods=['GET','POST'])
def get_user():
    email = request.headers.get('email')
    
    result=dict(userTable.find_one({"email":email}))
    result['_id']=str(result['_id'])
    # d={
    #     "_id":result['_id'],
    #     "name":result['name'],
    #     "email":result['email'],
    #     "phone":result['phone'],
    #     "district":result['district'],
    #     "imageURL":"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
    #     "salary":result['salary'],
    #     "area":result['area']
    # }
    
    return result
@app.route("/get_users",methods=['GET','POST'])
def get_users():
    result=userTable.find({})
    userList=[]
    for i in result:
        # d={
        # "_id":str(i['_id']),
        # "name":i['name'],
        # "email":i['email'],
        # "phone":i['phone'],
        # "district":i['district'],
        # "imageURL":"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
        # "salary":i['salary'],
        # "area":i['area']
        # }
        i['_id']=str(i['_id'])
        userList.append(i)
    return userList

@app.route("/updateuser",methods=['GET','POST'])
def updateuser():
    if request.method=='POST':
        data=request.get_json()
        del data['_id']
        filter = {'email': data['email']}
        newvalues = {"$set": data}
        userTable.update_one(filter,newvalues)
        # print(data)
    return data

@app.route("/updateimage",methods=['GET','POST'])
def updateimg():
    if request.method=='POST':
        data=request.get_json()
        filter = {'email': data['email']}
        newvalues = {"$set": {"imageURL":data['imageURL']}}
        userTable.update_one(filter,newvalues)
        # print(data)
    return {"msg":"Image Uploaded Successfully."}

@app.route("/instructor",methods=['GET','POST'])
def instructorProfile():
    id=request.headers.get('id')
    abc=dict(userTable.find_one({"_id":ObjectId(id)}))
    abc['_id']=str(abc['_id'])
    data=list(degreeTable.find({"user":abc['email']}))
    for x in data:
        x['_id']=str(x['_id'])
    return {
        "user":abc,
        "degree":data
    }

@app.route("/adddegree",methods=['GET','POST'])
def addDegree():
    if request.method=='POST':
        data=request.get_json()
        degreeTable.insert_one(data)
        return {"msg":"inserted Successfully","status":200}

@app.route("/getdegree",methods=['GET','POST'])
def getDegree():
    email = request.headers.get('email')
    data=list(degreeTable.find({"user":email}))
    for x in data:
        x['_id']=str(x['_id'])
    return data

@app.route("/deletedegree",methods=['GET','POST'])
def deleteDegree():
    id = request.headers.get('id')
    email = request.headers.get('email')
    degreeTable.delete_one({"_id":ObjectId(id)})
    data=list(degreeTable.find({"user":email}))
    for x in data:
        x['_id']=str(x['_id'])
    return data

@app.route("/createpost",methods=['GET','POST'])
def createPost():
    if request.method=='POST':
        data=request.get_json()
        postTable.insert_one(data)
    return {"msg":"POST CREATED SUCCESSFULLY"}

@app.route("/getpost",methods=['GET','POST'])
def getPost():
    posts=list(postTable.find())
    posts.reverse()
    for x in posts:
        x['_id']=str(x['_id'])
    return posts

@app.route("/changepoststatus",methods=['GET','POST'])
def changeStatus():
    id = request.headers.get('id')
    status = request.headers.get('status')
    if status=="0":
        status=1
    else:
        status=0
    post=postTable.update_one({"_id":ObjectId(id)}, {'$set': {"status":status}})
    posts=list(postTable.find())
    posts.reverse()
    for x in posts:
        x['_id']=str(x['_id'])
    return posts

@app.route("/deletepost",methods=['GET','POST'])
def deletePost():
    id = request.headers.get('id')
    postTable.delete_one({"_id":ObjectId(id)})
    posts=list(postTable.find())
    posts.reverse()
    for x in posts:
        x['_id']=str(x['_id'])
    return posts

app.run()


# Set-ExecutionPolicy Unrestricted -Scope Process
# ./ontutors/Scripts/activate