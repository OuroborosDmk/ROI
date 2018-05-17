#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import os

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("main.html")
	
	def post(self):
		uid=""
		imgcount=""
		newlist=""
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
		uid=alllist[1]
		imgcount=alllist[0]
		newlist=alllist[2]
		self.write({"count":imgcount,"uid":uid,"list":newlist})


