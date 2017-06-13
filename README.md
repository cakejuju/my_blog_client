# vue_my_blog

> A Vue.js project


# deploy

### development

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
# for development 
$ npm run dev
```


### production

```bash
$ npm install

$ npm run build # => 得到压缩后的 dist 目录， 用nginx代理
```


#### nginx config

```
server {
    listen       80;   # your port 
    server_name  xx.xx.xx.xx; # your server ip 

    charset utf-8;

    access_log  access_log  main; 

    location /api/ {
       proxy_pass  http://127.0.0.1:9292/; # 与后端项目启动端口保持一致
       # 支持跨域请求
       add_header 'Access-Control-Allow-Origin' '*';
       add_header 'Access-Control-Allow-Credentials' 'true';
       add_header 'Access-Control-Allow-Methods' 'GET';
       add_header 'Access-Control-Allow-Methods' 'POST';
    }

    location / {
       root /....; # vue 项目 build 后的目录位置 
       index index.html;
       try_files $uri $uri/ @router; # 应对 vue-router 单页刷新 404

    }

    location @router {
        rewrite ^.*$ /index.html last;
    }
}
```