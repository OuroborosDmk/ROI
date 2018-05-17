#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import os
import re
from methods.db import *

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
        V = self.get_argument("V")
        patientid=self.get_argument("patient")
        f=open(r"D:\Python34\myweb\static\value\username.txt","r")
        line=f.readline()
        line=line.strip('\n')
        try:
            sql = "INSERT INTO voftumour(username,patientid,volume) VALUES (" + line +","+ patientid +","+ V +")"
            cur.execute(sql)
            conn.commit()

        except:
            conn.rollback()
            return false

class ShowHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
    def post(self):
        sql="select * from voftumour"
