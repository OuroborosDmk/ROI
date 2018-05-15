#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import methods.readdb as mrd
import os

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
    def post(self):
    	id = self.get_argument("userid")
    	path="D:\Python34\myweb\statics\pic\\"+id;
    	self.write(path)


class IndexfHandler(tornado.web.RequestHandler):
    def post(self):
    	count1=0
    	for passfilename in os.listdir("D:\Python34\myweb\statics\pic"):
    		count1 += 1
    	count1=str(count1)
    	self.write(count1)