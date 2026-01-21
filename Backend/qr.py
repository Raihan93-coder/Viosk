import qrcode
import io

URL = "https://drive.google.com/drive/u/2/folders/1twHXZgtkbjOyeAkQmutKVVvGOI9WZitg"


def generetQR():
    # Generating QR Code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(URL)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Converting QR Code to Bytes
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr
