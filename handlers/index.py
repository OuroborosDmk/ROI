#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import os
import re
from methods.db import conn
from methods.db import cur
import tornado.escape

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
    def post(self):
        username=self.get_argument("username")
        uid=self.get_argument("userid")
        path="D:\Python34\myweb\static\pic\\"+uid
        for root, dirs, files in os.walk(path):
            idlist=files
        count2=0
        for passfilename in os.listdir(path):
            count2 += 1
        count2=str(count2)
        idlist=','.join(idlist)
        folder=os.path.exists("D:\\Python34\\myweb\\static\\value\\"+username)
        if not folder:
            os.makedirs("D:\\Python34\\myweb\\static\\value\\"+username)
        f=open("D:\Python34\myweb\static\\value\\"+username+"\json.txt","a")
        f.seek(0)
        f.truncate()
        f.write(count2)
        f.write('\n'+uid)
        f.write('\n'+idlist)
        f.close()

class IndexfHandler(tornado.web.RequestHandler):
    def post(self):
        userlist=[]
        for root, dirs, files in os.walk("D:\Python34\myweb\static\pic"):
            for dir in dirs:
                userlist.append(dir)
        userlist=','.join(userlist)
        count1=0
        for passfilename in os.listdir("D:\Python34\myweb\static\pic"):
            count1+=1
        count1=str(count1)
        self.write({"count":count1,"list":userlist})

class PatientHandler(tornado.web.RequestHandler):
    def get(self):
        sql="select * from patients"
        cur.execute(sql)
        user_infos=cur.fetchall()
        self.write(str(len(user_infos)));
    def post(self):
        indexcount=self.get_argument("postcount")
        count=int(indexcount)
        sql = "select * from patients"
        cur.execute(sql)
        user_infos=cur.fetchall()
        p_name=user_infos[count][1]
        p_sex=user_infos[count][2]
        p_age=str(user_infos[count][3])
        p_height=str(user_infos[count][4])
        p_weight=str(user_infos[count][5])
        p_occ=user_infos[count][6]
        self.write({"patientname":p_name,"patientsex":p_sex,"patientage":p_age,"patientheight":p_height,"patientweight":p_weight,"patientocc":p_occ})

class ResultHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
    def post(self):
        V=self.get_argument("V")
        patientid=self.get_argument("patient")
        feature=self.get_argument("features")
        area=self.get_argument("area")
        username=self.get_argument("username")
        sql = "SELECT * FROM informations WHERE username = '" + username + "' AND patientname = '" + patientid + "'"
        cur.execute(sql)
        userornot=cur.fetchall()
        if(userornot):
            try:
                sql="UPDATE informations SET voftumour= '"+ V +"',area='"+ area +"',feature='"+ feature +"' WHERE username = '" + username + "' AND patientname = '" + patientid + "'"
                cur.execute(sql)
                conn.commit()
            except:
                conn.rollback()
        else:
            try:
                sql = "INSERT INTO informations(username,patientname,voftumour,area,feature) VALUES ('" + username + "','"+ patientid +"','"+ V +"','"+area+"','"+ feature +"')"
                cur.execute(sql)
                conn.commit()
            except:
                conn.rollback()

class ShowoneHandler(tornado.web.RequestHandler):
    def get(self):
        username=self.get_argument("username")
        sql = "select * from informations where username='" + username + "'"
        cur.execute(sql)
        user_infos=cur.fetchall()
        self.write(str(len(user_infos)));
    def post(self):
        postcount=self.get_argument("postcount")
        username=self.get_argument("username")
        count=int(postcount)
        sql = "select * from informations where username='" + username + "'"
        cur.execute(sql)
        user_infos=cur.fetchall()
        db_id=user_infos[count][2]
        db_v=str(user_infos[count][3])
        db_a=user_infos[count][4]
        db_f=user_infos[count][5]
        self.write({"patientid":db_id,"voftumour":db_v,"feature":db_f,"area":db_a})
        
class MatrixHandler(tornado.web.RequestHandler): 
    def post(self):
        matrixa=tornado.escape.json_decode(self.request.body)
        matrix=str(matrixa)
        matrix=matrix.replace("[","")
        matrix=matrix.replace("]","\n")
        matrix=matrix.replace(",","")
        matrix=matrix.replace(" ","")
        matrix=matrix.replace("'","")
        '''
        matrix=str(matrixa)
        '''
        username=(matrix.split('username:'))[1]
        username=username.replace("\n","")
        matrix=matrix.replace("username:"+username,"")
        uid=""
        alllist=[]
        f=open("D:\Python34\myweb\static\\value\\"+username+"\json.txt","r")
        line=f.readline()
        line=line.strip('\n')
        alllist.append(line)
        while line:
            line=f.readline()
            line=line.strip('\n')
            alllist.append(line)
        f.close()
        uid=alllist[1]
        folder=os.path.exists("D:\\Python34\\myweb\\static\\Matrix\\"+uid+"\\"+username)
        if not folder:
            os.makedirs("D:\\Python34\\myweb\\static\\Matrix\\"+uid+"\\"+username)
        f=open("D:\Python34\myweb\static\Matrix\\"+uid+"\\"+username+"\matrix.txt","a")
        f.seek(0)
        f.truncate()
        '''
        matrix=str(matrixa)
        matrix=matrix.replace("[","")
        matrix=matrix.replace("]","\n")
        matrix=matrix.replace(",","")
        matrix=matrix.replace(" ","")
        matrix=matrix.replace("'","")
        '''
        matrix=matrix.replace("a"," ")
        f.write(matrix)
        f.close()