document.addEventListener("DOMContentLoaded", () => {
    // Lắng nghe sự kiện trên tất cả input URL
    const urlInputs = document.querySelectorAll(".url-input");

    urlInputs.forEach((input) => {
        input.addEventListener("blur", (event) => {
            const url = event.target.value.trim(); // Lấy URL từ input
            const cardWindow = input.closest(".card-window"); // Tìm phần tử cha gần nhất
            if (!cardWindow) return; // Nếu không có card-window, thoát

            const showArea = cardWindow.querySelector(".card-window__show");
            if (!showArea) return; // Nếu không có khu vực hiển thị, thoát

            // Nếu có URL, hiển thị iframe
            if (url) {
                showArea.innerHTML = `<iframe src="${url}" frameborder="0" class="card-window__iframe"></iframe>`;
            } else {
                showArea.innerHTML = ""; // Xóa nội dung nếu URL rỗng
            }
        });
    });
});

// Khởi tạo dữ liệu cho tất cả các đồng hồ
const timers = [];

// Thiết lập sự kiện cho từng đồng hồ
document.querySelectorAll(".card-window").forEach((cardWindow, index) => {
    // Gán data-id nếu chưa có
    cardWindow.dataset.id = index;

    // Lấy các phần tử con của mỗi đồng hồ
    const minutesInput = cardWindow.querySelector(".card-window__input-minutes");
    const secondsInput = cardWindow.querySelector(".card-window__input-seconds");
    const display = cardWindow.querySelector(".timer-display");
    const startBtn = cardWindow.querySelector(".start-btn");
    const stopBtn = cardWindow.querySelector(".stop-btn");
    const resetBtn = cardWindow.querySelector(".reset-btn");

    // Khởi tạo dữ liệu timer cho đồng hồ hiện tại
    timers[index] = {
        minutes: 0,
        seconds: 0,
        interval: null
    };

    // Cập nhật giao diện của đồng hồ
    const updateDisplay = () => {
        const { minutes, seconds } = timers[index];
        display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    // Bắt đầu đồng hồ
    startBtn.addEventListener("click", () => {
        // Lấy giá trị từ input
        const inputMinutes = parseInt(minutesInput.value, 10) || 0;
        const inputSeconds = parseInt(secondsInput.value, 10) || 0;

        // Lưu giá trị vào timer
        timers[index].minutes = inputMinutes;
        timers[index].seconds = inputSeconds;

        // Dừng bộ đếm cũ nếu đang chạy
        clearInterval(timers[index].interval);

        // Bắt đầu bộ đếm mới
        timers[index].interval = setInterval(() => {
            timers[index].seconds++;
            if (timers[index].seconds === 60) {
                timers[index].seconds = 0;
                timers[index].minutes++;
            }
            updateDisplay();
        }, 1000);
    });

    // Dừng đồng hồ
    stopBtn.addEventListener("click", () => {
        clearInterval(timers[index].interval);
    });

    // Đặt lại đồng hồ
    resetBtn.addEventListener("click", () => {
        clearInterval(timers[index].interval);
        timers[index].minutes = 0;
        timers[index].seconds = 0;
        updateDisplay();
    });

    // Hiển thị giá trị ban đầu
    updateDisplay();
});

document.addEventListener("DOMContentLoaded", () => {
    // Lắng nghe sự kiện click vào nút chụp ảnh
    const captureButton = document.querySelector("#capture-screen");
    const inputResolution = document.querySelector(".filter-show__column-num"); // Lấy input độ nét

    captureButton.addEventListener("click", () => {
        // Tìm phần tử cha chứa tất cả các card-item
        const rowElement = document.querySelector(".row");

        if (rowElement) {
            // Đọc giá trị độ nét từ input
            const resolution = parseInt(inputResolution.value) || 5; // Mặc định là 5 nếu không có giá trị hợp lệ

            // Sử dụng html2canvas để chụp toàn bộ row
            html2canvas(rowElement, {
                scale: resolution // Điều chỉnh độ phân giải
            }).then(canvas => {
                // Chuyển canvas thành URL ảnh
                const imgData = canvas.toDataURL("image/png");

                // Tạo thẻ a để tải ảnh về
                const link = document.createElement("a");
                link.href = imgData;
                link.download = "screenshot.png"; // Đặt tên file ảnh
                link.click(); // Tự động tải ảnh về máy tính
            });
        }
    });
});