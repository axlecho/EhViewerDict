Ehviewer的字典生成工具（基于node.js)
===

####安装依赖模块

	$ npm install q commander lei-stream
	
####抓取数据

	$ nodejs script_for_bangumi.js

生成的数据保存在data.tmp

####生成字典

	$ nodejs cover.js -i target.dat
	
####抓取数据

data.dat 为抓取的数据
data.ehdict 转换后的字典
data.zip 为打包后的数据

demo.dat 为data.dat的部分数据
demo.ehdict 为测试用的字典

####其他
在此感谢 `Bangumi 番组计划`网站提供的数据  
希望大家在使用该脚本时注意使用频率，以免给Bangumi的服务器带来过大的压力
