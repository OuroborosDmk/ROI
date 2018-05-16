#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import os

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("main.html")
	
	def post(self):
		path=""
		imgcount=""
		newlist=""
		alllist=[]
		f=open(r"D:\Python34\myweb\statics\\value\josn.txt","r")
		line=f.readline()
		line=line.strip('\n')
		alllist.append(line)
		while line:
			line=f.readline()
			line=line.strip('\n')
			alllist.append(line)
		f.close()
		path=alllist[1]
		imgcount=alllist[0]
		newlist=alllist[2]
		self.write({"count":imgcount,"path":path,"list":newlist})


