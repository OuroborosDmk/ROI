#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import os

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
    def post(self):    
        id = self.get_argument("userid")
        path="D:\Python34\myweb\statics\pic\\"+id
        for root, dirs, files in os.walk(path):
            idlist=files
        count2=0
        for passfilename in os.listdir(path):
            count2 += 1
        count2=str(count2)
        idlist=''.join(idlist)
        txtpath="D:\Python34\myweb\statics\\value\josn.txt"
        f = open(txtpath,'a')
        f.seek(0)
        f.truncate()
        f.write(count2)
        f.write('\n'+path)
        f.write('\n'+idlist)
        f.close()


class IndexfHandler(tornado.web.RequestHandler):
    def post(self):
        for root, dirs, files in os.walk(path):
            userlist=files
        userlist=''.join(userlist)
    	count1=0
    	for passfilename in os.listdir("D:\Python34\myweb\statics\pic"):
    		count1 += 1
    	count1=str(count1)
    	self.write({"count":count1,"username":userlist})