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
        uid = self.get_argument("userid")
        path="D:\Python34\myweb\static\pic\\"+uid
        for root, dirs, files in os.walk(path):
            idlist=files
        count2=0
        for passfilename in os.listdir(path):
            count2 += 1
        count2=str(count2)
        idlist=','.join(idlist)
        txtpath="D:\Python34\myweb\static\\value\josn.txt"
        f = open(txtpath,'a')
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
            count1 += 1
        count1=str(count1)
        self.write({"count":count1,"list":userlist})

class ResultHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
    def post(self):
        V=self.get_argument("V")
        patientid=self.get_argument("patient")
        feature=self.get_argument("features")
        area=self.get_argument("area")
        f=open(r"D:\Python34\myweb\static\value\username.txt","r")
        line=f.readline()
        line=line.strip('\n')
        '''
        path="D:\Python34\myweb\static\\value\patientid.txt";
        f = open(path,'a')
        f.seek(0)
        f.truncate()
        f.write(patientid)
        f.close()
        '''
        try:
            sql = "INSERT INTO informations(username,patientname,voftumour,area,feature) VALUES ('" + line + "','"+ patientid +"',"+ V +",'"+area+"','"+ feature +"')"
            cur.execute(sql)
            conn.commit()

        except:
            conn.rollback()
            return false

class ShowoneHandler(tornado.web.RequestHandler):
    def get(self):
        f=open(r"D:\Python34\myweb\static\value\username.txt","r")
        line=f.readline()
        line=line.strip('\n')
        sql = "select * from informations where username='" + line + "'"
        cur.execute(sql)
        user_infos=cur.fetchall()
        self.write(str(len(user_infos)));
    def post(self):
        postcount=self.get_argument("postcount")
        count=int(postcount)
        f=open(r"D:\Python34\myweb\static\value\username.txt","r")
        line=f.readline()
        line=line.strip('\n')
        sql = "select * from informations where username='" + line + "'"
        cur.execute(sql)
        user_infos=cur.fetchall()
        db_id=user_infos[count][2]
        db_v=str(user_infos[count][3])
        db_a=user_infos[count][4]
        db_f=user_infos[count][5]
        '''
        sql = "select * from matrix where username='" + line + "'"
        cur.execute(sql)
        user_infos=cur.fetchall()
        db_path=user_infos[0][3]
        '''
        self.write({"username":line,"patientid":db_id,"voftumour":db_v,"feature":db_f,"area":db_a})
        #self.write(str());
        
class MatrixHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("main.html")
    def post(self):
        matrixa = tornado.escape.json_decode(self.request.body)
        uid=""
        alllist=[]
        f=open(r"D:\Python34\myweb\static\value\josn.txt","r")
        line=f.readline()
        line=line.strip('\n')
        alllist.append(line)
        while line:
            line=f.readline()
            line=line.strip('\n')
            alllist.append(line)
        f.close()
        f=open(r"D:\Python34\myweb\static\value\username.txt","r")
        username=f.readline()
        username=username.strip('\n') 
        uid=alllist[1]
        folder=os.path.exists("D:\\Python34\\myweb\\static\\Matrix\\"+uid+"\\"+username)
        if not folder:
            os.makedirs("D:\\Python34\\myweb\\static\\Matrix\\"+uid+"\\"+username)
        f=open("D:\\Python34\\myweb\\static\\Matrix\\"+uid+"\\"+username+"\\"+"matrix"+".txt","a")
        f.seek(0)
        f.truncate()
        f.write(str(matrixa))
        f.close()
        '''
        try:
            sql = "INSERT INTO Matrix(username,patientid,dpath) VALUES ('" + username +"','"+ uid +"','"+ path +"')"
            cur.execute(sql)
            conn.commit()

        except:
            conn.rollback()
        '''
            