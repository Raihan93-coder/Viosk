import qrcode
import io
from fastapi import APIRouter   
from fastapi import Response

URL = "https://drive.google.com/drive/u/2/folders/1twHXZgtkbjOyeAkQmutKVVvGOI9WZitg"

qr_router = APIRouter()

@qr_router.get("/generate_qr")
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
    return Response(content=img_byte_arr.getvalue(), media_type="image/png")
