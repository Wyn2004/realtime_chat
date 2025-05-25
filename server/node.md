Install lib
npm install --save-dev typescript ts-node-dev @types/node @types/express

Tạo file tsconfig
npx tsc --init

emit là cách mà client và server gửi dữ liệu cho nhau

socket.emit 
  Đây là cách gửi sự kiện (event) từ server hoặc client tới 1 socket cụ thể — tức là gửi trực tiếp cho 1 client riêng lẻ (đối với server) hoặc gửi từ client tới server.

socket.broadcast.emit()
  gửi tới tất cả client khác trừ chính client đó.

io.emit
  Đây là cách gửi sự kiện từ server đến tất cả các client đang kết nối.

socket.off(key_mess)
  Khi component bị unmount (rời khỏi màn hình), ta huỷ đăng ký sự kiện để tránh memory leak hoặc trùng lặp sự kiện.