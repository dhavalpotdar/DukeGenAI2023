import base64

from flask import Flask, request
from PIL import Image


app = Flask(__name__)
 
@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name


@app.route('/upload/image/', methods=['POST'])
def upload_image():
   file = request.files['image']

   img = Image.open(file.stream).convert('L')
   img.show()

   return {"data": "louda"}

 
if __name__ == '__main__':
   app.run()