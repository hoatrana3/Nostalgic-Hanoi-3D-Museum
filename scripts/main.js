alert('Cảm ơn bạn đã ghé thăm triển lãm Hoài niệm Hà Nội phố.\nQuá trình tải và hiển thị dữ liệu ở lần đầu truy cập có thể mất khoảng 1 phút, kính mong bạn thông cảm...')

function onBodyLoaded() {
    pauseAllVideo()
    setAllModelLoadedEvent()
    turnOffRoomLights()

    setupAllViewerThings()
    modelViewerCloseButtonEvent()
    setOptionButtonsEvent()

    setTimeout(function () {
        setupAllViewerThings()
        setupThingsAfterLoaded()
    }, 5000)
}

function setupThingsAfterLoaded() {
    setAccessButtonContent()
    addAccessButtonEvent()
    setSceneUpdateShadow()
    toggleCameraPointerLockControl(true)
}

function setSceneUpdateShadow() {
    const scene = document.querySelector('a-scene')
    scene.renderer.shadowMap.autoUpdate = false;
    scene.renderer.shadowMap.needsUpdate = true;
}

function setAllModelLoadedEvent() {
    const modelList = document.querySelectorAll('[gltf-model]')
    let timeoutLoadedAll = null

    modelList.forEach(model => {
        model.addEventListener('model-loaded', () => {
            if (timeoutLoadedAll != null) clearTimeout(timeoutLoadedAll)
            timeoutLoadedAll = setTimeout(() => {
                setupAllViewerThings()
                setupThingsAfterLoaded()
            }, 1000)
        })
    })
}

function setAccessButtonContent() {
    const accessBtnText = document.getElementById('access-btn-text')
    const accessBtnIcon = document.getElementById('access-btn-icon')

    if (accessBtnText != null) accessBtnText.innerHTML = 'Xem triển lãm'
    if (accessBtnIcon != null) {
        accessBtnIcon.classList.remove('fa-spinner')
        accessBtnIcon.classList.add('fa-arrow-right')
    }
}

function pauseAllVideo() {
    const videos = document.querySelectorAll('video')
    videos.forEach(video => video.pause())
}

function addAccessButtonEvent() {
    const loadingScreen = document.getElementById('loading-screen')
    const accessBtn = document.getElementById('access-btn')

    accessBtn.addEventListener('click', () => {
        loadingScreen.classList.add('hide')
        setSceneUpdateShadow()
    })
}

function setOptionButtonsEvent() {
    homeButtonEvent()
    facebookButtonEvent()
    screenshotButtonEvent()
    lightToggleButtonEvent()
}

function homeButtonEvent() {
    const loadingScreen = document.getElementById('loading-screen')
    const homeButton = document.getElementById('home-btn')
    homeButton.addEventListener('click', () => {
        loadingScreen.classList.remove('hide')
    })
}

function facebookButtonEvent() {
    const facebookButton = document.getElementById('facebook-btn')
    facebookButton.addEventListener('click', () => {
        if (confirm("Sẽ có popup trang cá nhân Facebook của chúng tôi xuất hiện.\nBạn muốn ghé thăm chứ?")) {
            window.open('https://www.facebook.com/hoatrana3', '_blank')
            window.open('https://www.facebook.com/ngohoang34', '_blank')
        }
    })
}

function screenshotButtonEvent() {
    const screenshotButton = document.getElementById('screenshot-btn')
    screenshotButton.addEventListener('click', () => {
        if (confirm("Quá trình screenshot sẽ cho bạn 2 ảnh: dạng perspective và dạng equirectangular để tải xuống.\nQuá trình sẽ mất khoảng vài giây, bạn muốn screenshot ngay chứ?")) {
            document.querySelector('a-scene').components.screenshot.capture('perspective');
            document.querySelector('a-scene').components.screenshot.capture('equirectangular');
        }
    })
}

function lightToggleButtonEvent() {
    const lightToggleBtn = document.getElementById('light-toggle-btn')
    lightToggleBtn.addEventListener('click', () => {
        lightToggleBtn.classList.toggle('light-on')

        if (lightToggleBtn.classList.contains('light-on')) {
            turnOnRoomLights()
            setSceneUpdateShadow()
        } else {
            turnOffRoomLights()
        }
    })
}

function turnOffRoomLights() {
    const frontLight = document.getElementById('front-light')
    const room1Light = document.getElementById('room1-light')
    const room2Light = document.getElementById('room2-light')
    const room3Light = document.getElementById('room3-light')

    turnOffLight(frontLight)
    turnOffLight(room1Light)
    turnOffLight(room2Light)
    turnOffLight(room3Light)
}

function turnOnRoomLights() {
    const frontLight = document.getElementById('front-light')
    const room1Light = document.getElementById('room1-light')
    const room2Light = document.getElementById('room2-light')
    const room3Light = document.getElementById('room3-light')

    turnOnLight(frontLight)
    turnOnLight(room1Light)
    turnOnLight(room2Light)
    turnOnLight(room3Light)
}

function turnOffLight(light) {
    light.setAttribute('visible', false)
    light.setAttribute('light', 'castShadow', false)
    light.setAttribute('light', 'intensity', 0)
}

function turnOnLight(light) {
    light.setAttribute('visible', true)
    light.setAttribute('light', 'castShadow', true)
    light.setAttribute('light', 'intensity', 1)
}

function modelViewerCloseButtonEvent() {
    const closeBtn = document.getElementById('model-view-close-btn')

    closeBtn.addEventListener('click', () => {
        toggleModelViewer(false)
    })

    document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) toggleModelViewer(false)
    })
}

function toggleCameraPointerLockControl(isEnable) {
    const cameraEl = document.getElementById('mainCamera')

    if (cameraEl != null) {
        if (isEnable) {
            cameraEl.setAttribute('look-controls', 'enabled: true; pointerLockEnabled: true')
        } else {
            cameraEl.setAttribute('look-controls', 'enabled: false')
        }
    }
}

function toggleModelViewer(isOpen, objectId) {
    if (isOpen) {
        const modelViewerDom = document.getElementById('model-viewer-container')

        if (modelViewerDom != null) {
            modelViewerDom.classList.add('show')
            toggle3DObjectContent(true, objectId)
            toggleCameraPointerLockControl(false)
        }
    } else {
        const modelViewerDom = document.getElementById('model-viewer-container')

        if (modelViewerDom != null) {
            modelViewerDom.classList.remove('show')
            toggle3DObjectContent(false)
            toggleCameraPointerLockControl(true)
        }
    }
}

/** ===================================================================================
 * 
 * CONTENT PARTS 
 * 
 * ===================================================================================
 * */
const viewers = {
    others: null,
    part1: null,
    part2: null,
    part3: null
}

var viewerContent = null

function setupAllViewerThings() {
    viewerContent = document.getElementById('viewer-content')

    const otherImagesEl = document.getElementById('otherImages')
    const part1ImagesEl = document.getElementById('part1Images')
    const part2ImagesEl = document.getElementById('part2Images')
    const part3ImagesEl = document.getElementById('part3Images')

    if (otherImagesEl != null) {
        viewers.others = new Viewer(otherImagesEl)
        setupViewEventListeners(viewers.others)
    }
    if (part1ImagesEl != null) {
        viewers.part1 = new Viewer(part1ImagesEl)
        setupViewEventListeners(viewers.part1)
    }
    if (part2ImagesEl != null) {
        viewers.part2 = new Viewer(part2ImagesEl)
        setupViewEventListeners(viewers.part2)
    }
    if (part3ImagesEl != null) {
        viewers.part3 = new Viewer(part3ImagesEl)
        setupViewEventListeners(viewers.part3)
    }
}

function setupViewEventListeners(viewer) {
    viewer.element.addEventListener('hide', () => {
        toggleCameraPointerLockControl(true)
        viewerContent.classList.remove('show')
    })
    viewer.element.addEventListener('view', (event) => {
        toggleCameraPointerLockControl(false)

        const content = IMAGE_CONTENTS[event.detail.originalImage.id]
        if (content != null && content !== '') {
            viewerContent.classList.add('show')
            setViewerContent(content)
        } else {
            viewerContent.classList.remove('show')
        }
    })
}

function toggle3DObjectContent(isShow, objectId) {
    if (isShow) {
        const content = OBJECT_CONTENTS[objectId]
        if (content != null && content !== '') {
            viewerContent.classList.add('show')
            setViewerContent(content)
        } else {
            viewerContent.classList.remove('show')
        }
    } else {
        viewerContent.classList.remove('show')
    }
}

function setViewerContent(content) {
    viewerContent.innerHTML = content
    viewerContent.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

/**
 * EVERY CONTENTS OF IMAGES
 */
const IMAGE_CONTENTS = {
    /**
     * OTHER CONTENT
     */
    img_hanoipho: `
    <h3 class="mb-3">Người thực hiện</h3>
    <p>
         Lấy cảm hứng từ triển lãm <b>"Hoài niệm Hà Nội phố"</b> có thật của <i>Trung tâm lưu trữ Quốc gia</i> 
         cũng như nhằm hoàn thành dự án cho bộ môn <b>Chuyên đề trong Công nghệ</b>. Chúng tôi 
         <i>- Trần Bá Hoà và Ngô Minh Hoàng -</i> đã quyết định tạo ra một triển lãm 3D ảo cùng tên trên nền tảng web...
    </p>
    <p>
        Triển lãm ảo này sử dụng một số công cụ và frameworks sau: <i>Blender, AframeVR, HTML/CSS/JS và một số thư viện nhỏ khác.</i>
    </p>
    <p>
        Chúng tôi xin chân thành cảm ơn sư quan tâm và ủng hộ của các bạn!
    </p>
    `,
    img_backdrop: `
    <h3 class="mb-3">Lời giới thiệu</h3>
    <p>
        Với bề dày lịch sử hơn nghìn năm, Thăng Long xưa và Hà Nội ngày nay luôn là trung tâm chính trị,
        kinh tế,
        văn hoá và giáo dục lớn của cả nước, là biểu tượng cho các giá trị văn hóa của dân tộc và là niềm tự
        hào của
        mỗi người dân Việt Nam. Để người dân thủ đô và công chúng có cái nhìn toàn diện hơn về lịch sử, văn
        hóa, đất
        và người Thăng Long – Hà Nội trong những năm đầu thế kỉ XIX đến giữa thế kỉ XX, Cục Văn thư và Lưu
        trữ nhà
        nước phối hợp với Đại sứ quán Pháp tại Việt Nam tổ chức Triển lãm tài liệu lưu trữ với chủ đề “Hoài
        niệm Hà
        Nội phố”.
    </p>
    <p>
        Hơn 130 phiên bản tài liệu, hình ảnh, bản đồ, bản vẽ kỹ thuật… được lựa chọn trưng bày tại Triển lãm
        sẽ phần
        nào tái hiện đời sống sinh hoạt, văn hoá, tôn giáo của người dân Hà Nội; khu phố cổ – nơi lưu giữ
        dấu ấn của
        một “Hà Nội ba sáu phố phường” thuở xưa; Thành cổ Hà Nội với quy mô và kiến trúc độc đáo; Văn Miếu
        Quốc tử
        Giám – Trường Đại học lâu đời nhất Việt Nam; thắng cảnh Hồ Tây cùng nhiều di tích lịch sử bao quanh;
        Hồ Hoàn
        Kiếm với cầu Thê Húc, tháp Rùa, đền Ngọc Sơn cùng các công trình mang đậm phong cách kiến trúc Á –
        Âu thời
        Pháp thuộc…
    </p>
    <p>
        Xuất phát từ tình trạng vật lý và yêu cầu bảo vệ an toàn tài liệu, Ban tổ chức chỉ đưa ra trưng bày
        các
        phiên bản. Phần lớn bản gốc tài liệu hiện đang được bảo quản tại Trung tâm Lưu trữ quốc gia I thuộc
        Cục Văn
        thư và Lưu trữ nhà nước.
    </p>
    <p>
        Triển lãm <b>"Hoài niệm Hà Nội phố"</b> được bố cục theo 3 chủ đề:
        <ul>
            <li>
                <b>Chủ đề 1:</b> Từ Nhượng địa Pháp đến khu phố Tây.
            </li>
            <li>
                <b>Chủ đề 2:</b> Phố cổ Hà Nội.
            </li>
            <li>
                <b>Chủ đề 3:</b> Thành Hà Nội và phụ cận.
            </li>
        </ul>
    </p>
    <p>
        Ban Tổ chức hi vọng, Triển lãm “Hoài niệm Hà Nội phố” còn là dịp để công chúng được tiếp cận nguồn
        tài liệu
        lưu trữ có giá trị đặc biệt đối với các công trình nghiên cứu về lịch sử, văn hóa, quy hoạch, kiến
        trúc… của
        Thủ đô ngàn năm văn hiến. Đó vừa là niềm tự hào, vừa là động lực để người dân Hà Nội nói riêng và
        người dân
        Việt Nam nói chung bảo tồn và phát huy những giá trị văn hóa truyền thống cũng như phấn đấu xây dựng
        Thủ đô
        ngày càng giàu đẹp, văn minh, hiện đại.
    </p>
    <p>
        Đây cũng là một trong những sự kiện văn hoá tiêu biểu được tổ chức nhân kỉ niệm 56 năm ngày thành
        lập Cục
        Văn thư và Lưu trữ nhà nước và 45 năm ngày thiết lập quan hệ ngoại giao Việt Nam – Pháp.
    </p>
    <small>
        <i>
            <b>Nguồn tư liệu:</b>
            <a href="http://www.archives.org.vn/trien-lam-chau-ban/2018-hoai-niem-ha-noi-pho.htm?fbclid=IwAR0mTVNXr8SMyg-J0oU3EauBNFezM4lXfss9pexUqB_y_rgyX3PhGpCgh9k"
                target="_blank">Trung tâm lưu trữ Quốc gia</a>
            và một số tư liệu khác
        </i>
    </small>
    <br><br>
    `,

    /**
     * PART 1 CONTENT
     */
    img_part1_0_full: `
    <h3 class="mb-3">Phần 1: Từ Nhượng địa Pháp đến Khu phố Tây</h3>
    <p>
        Năm 1873, người Pháp đánh chiếm Bắc Kì lần thứ nhất. Đồn Thủy là khu nhượng địa đầu tiên mà triều đình nhà Nguyễn 
        đã cắt nhượng cho Pháp với diện tích ban đầu rộng hơn 18ha. Khu đất này nằm bên bờ sông Hồng, phía Đông Nam nội thành Hà Nội.
        Tại đây, Pháp cho xây dựng Tòa Lãnh sự cùng nhiều công trình quân – dân sự nhằm mục đích bình định toàn xứ Bắc Kì và để 
        chuẩn bị cho sự ra đời thành phố nhượng địa Hà Nội vào năm 1888. Cũng kể từ đây, người Pháp từng bước tiến hành cải tạo không gian Hà Nội, 
        xây cất nhiều công sở, công trình công cộng, mở hàng loạt các tuyến phố mới mà người ta quen gọi là “khu phố Tây” như: 
        phố Paul Bert (nay là phố Tràng Tiền – Hàng Khay), phố Borgnis Desbordes (phố Tràng Thi), đại lộ Gambetta (phố Trần Hưng Đạo)… 
        nhằm biến nơi này thành khu vực dành riêng cho họ.
    </p>
    `,
    img_part1_0_mini_1: `
    <h3>Khu Nhượng địa năm 1877</h3>
    <h5 class="font-italic mb-3">French concession area in 1877</h5>
    <p>
        <b>Từ trái sang phải:</b> <i>Trại lính</i> - <i>nhà ở của trưởng chỉ huy công binh,
        Tổng chỉ huy quân đội và các sĩ quan</i> - <i>Toà lãnh sự</i> - <i>Dinh Chưởng ấn</i>.
    </p>
    <p>
        <b>From left to right:</b> <i>Solider's camp</i> - <i>houses of Military Engineering Commander,
        Army General Commander and officers</i> - <i>the Consulate</i> - <i>the Chanellor's Palace</i>.
    </p>
    `,
    img_part1_1_mini_1: `
    <h3>Cổng Pháp quốc và nghĩa trang tại khu Nhượng địa năm 1884</h3>
    <h5 class="font-italic">The French Gate and cemetery in French concession area in 1884</h5>
    `,
    img_part1_1_mini_2: `
    <h3>Khoa lây nhiễm của Bệnh viện Lanessan (nay là Bệnh viện quân đội 108) được xây dựng vào năm 1894 theo phong cách hiện đại</h3>
    <h5 class="font-italic">Department of inflectious diseases in Lanessan Hospital (the current 108 Military Central Hospital) built in 1894 in modern style</h5>
    `,
    img_part1_1_mini_3: `
    <h3>Nghị định ngày 19/7/1888 của Toàn quyền Đông Dương về việc thành lập chín quyền thành phố Hà Nội và Hải Phòng</h3>
    <h5 class="font-italic">Decree enacted on July 19, 1888 by Govenor-General of Indochina on te establishment of municipal authorities in Hanoi and Hai Phong</h5>
    `,
    img_part1_2_mini_1: `
    <h3>Bản đồ thành phố Hà Nội lập năm 1899</h3>
    <h5 class="font-italic mb-3">Map of Hanoi published in 1899</h5>
    <p><b>Tỉ lệ bản đồ:</b> 1/10.000</p>
    <p><b>Map's scale ratio:</b> 1/10.000</p>
    `,
    img_part1_3_mini_1: `
    <h3>Cây cầu nhỏ dẫn vào đền Ngọc Sơn năm 1884</h3>
    <h5 class="font-italic">The small bridge leading to Ngo Son Temple in 1884</h5>
    `,
    img_part1_3_mini_2: `
    <h3>Hồ Hoàn Kiếm năm 1884</h3>
    <h5 class="font-italic">Hoan Kiem Lake in 1884</h5>
    `,
    img_part1_3_mini_3: `
    <h3>Tháp Hoà Phong, di tích cuối cùng của Báo Ân năm 1892</h3>
    <h5 class="font-italic">Thap Hoa Phong (Tower of Favorable Wind) in 1892 - the only remains of Bao An Pagoda</h5>
    `,
    img_part1_4_mini_1: `
    <h3>Quảng trường Chavassieux (nay là vườn hoa Diên Hồng) và phủ Thống sứ Bắc Kì</h3>
    <h5 class="font-italic">Chavassieux Square (the curent Dien Hong Flower Garden) and Tonkin Resident superior's Palace</h5>
    `,
    img_part1_4_mini_2: `
    <h3>Toà Đốc lí Hà Nội</h3>
    <h5 class="font-italic">Hanoi Town Hall</h5>
    `,
    img_part1_4_mini_3: `
    <h3>Sở Bưu điện Hà Nội</h3>
    <h5 class="font-italic">Hanoi Central Post Office</h5>
    `,
    img_part1_4_mini_4: `
    <h3>Quảng trường Paul Bert (nay là vườn hoa Lý Thái Tổ) và Sở Ngân khố ở Hà Nội</h3>
    <h5 class="font-italic">Paul Bert (the current Ly Thai To Flower Garden) and The Treasury of Hanoi</h5>
    `,
    img_part1_4_mini_5: `
    <h3>Nhà Thuỷ Tạ bên bờ hồ Hoàn Kiếm, Hà Nội</h3>
    <h5 class="font-italic">Nha Thuy Ta (Thuy Ta Café) on the shore of Hoan Kiem Lake, Hanoi</h5>
    `,
    img_part1_5_mini_1: `
    <h3>Ga Hà Nội</h3>
    <h5 class="font-italic">Hanoi Railway Station</h5>
    `,
    img_part1_5_mini_2: `
    <h3>Trường Đại học Đông Dương</h3>
    <h5 class="font-italic">The University of Indochina</h5>
    `,
    img_part1_5_mini_3: `
    <h3>Bản đồ thành phố Hà Nội lập năm 1915</h3>
    <h5 class="font-italic mb-3">Map of Hanoi published in 1915</h5>
    <p><b>Tỉ lệ bản đồ:</b> 1/10.000</p>
    <p><b>Map's scale ratio:</b> 1/10.000</p>
    `,
    img_part1_5_mini_4: `
    <h3>Nghị định số 90 ngày 17/7/1914 của Quan cai trị - Đốc lí Hà Nội về việc vạch ranh giới các khu phố của Hà Nội</h3>
    <h5 class="font-italic">Decree No 90 enacted on July 17, 1914 by the Mayor of Hanoi on identifying boundaries of streets in Hanoi</h5>
    `,
    img_part1_6_mini_1: `
    <h3>Toàn cảnh thành phố Hà Nội. Bức ảnh thể hiện sự khác biệt rõ nét giữa khu phố cổ buôn bán của người Việt với khu phố của người Âu sau hồ Hoàn Kiếm</h3>
    <h5 class="font-italic">Panoramic view of Hanoi. The picture shows critical difference between the old commercial quarter of Vietnamese and the French quarter on the other side of Hoan Kiem Lake</h5>
    `,
    img_part1_6_mini_2: `
    <h3>Quảng trường Hébrard và vườn trẻ (nay là Cung thiếu nhi Hà Nội) được xây dựng theo ý tưởng của Virgitti, Công sứ - Đốc lí Hà Nội (1937) (1)</h3>
    <h5 class="font-italic">Hébrard Sqaure annd the Kindergarden (the current Hanoi Children's Palace) were built according to the idea of Mayor Virgitti (1937) (1)</h5>
    `,
    img_part1_6_mini_3: `
    <h3>Quảng trường Hébrard và vườn trẻ (nay là Cung thiếu nhi Hà Nội) được xây dựng theo ý tưởng của Virgitti, Công sứ - Đốc lí Hà Nội (1937) (2)</h3>
    <h5 class="font-italic">Hébrard Sqaure annd the Kindergarden (the current Hanoi Children's Palace) were built according to the idea of Mayor Virgitti (1937) (2)</h5>
    `,

    /**
     * PART 2 CONTENT
     */
    img_part2_1_full: `
    <h3 class="mb-3">Phần 2: Phố cổ Hà Nội</h3>
    <p>
        Phố cổ Hà Nội là khu dân cư sinh hoạt và buôn bán sầm uất hình thành từ thời Lý – Trần, nằm ở phía đông của Hoàng thành Thăng Long chạy dài ra sông Hồng.
        Nơi đây tập trung nhiều tiểu thương, phường thợ thủ công tinh hoa đến từ nhiều vùng miền khác nhau, hình thành nên những phố nghề mang tên “Hàng” như: 
        Hàng Đường, Hàng Bạc, Hàng Gai, Hàng Mã… Những ngôi nhà ống, mái ngói nghiêng, mặt tiền là cửa hàng buôn bán cũng trở thành nét đặc trưng rất riêng của phố cổ Hà Nội. 
        Ngoài ra, khu vực này còn có rất nhiều di tích lịch sử lâu đời: đền Bạch Mã, chùa Thái Cam, Ô Quan chưởng. Các khu chợ sầm uất như Đồng Xuân 
        – Bắc Qua, Hàng Da, Hàng Bè cũng được quy tụ tại đây. Trải qua bao thăng trầm lịch sử gắn liền với vùng đất Thăng Long – Hà Nội, đến nay, 
        phố cổ Hà Nội vẫn luôn tấp nập người nua kẻ bán và là điểm đến thú vị với du khách trong và ngoài nước khi đến với Hà Nội.
    </p>
    <br>
    `,
    img_part2_1_mini_1: `
    <h3>Đường phố Hà Nội</h3>
    <h5 class="font-italic">Hanoi streets</h5>
    `,
    img_part2_2_mini_1: `
    <h3>Chợ Đồng Xuân</h3>
    <h5 class="font-italic">Dong Xuan Market</h5>
    `,
    img_part2_2_mini_2: `
    <h3>Hàng bán đèn lồng giấy</h3>
    <h5 class="font-italic">Lantem shop</h5>
    `,
    img_part2_2_mini_3: `
    <h3>Hà Nội xưa - Phố Hàng Tre</h3>
    <h5 class="font-italic">Old Hanoi - Hang Tre street</h5>
    `,
    img_part2_2_mini_4: `
    <h3>Bán câu đối</h3>
    <h5 class="font-italic">Selling distich</h5>
    `,
    img_part2_3_mini_1: `
    <h3>Yết thị ngày 2/5/1925 thông báo về việc mở rộng phố Hàng Đậu ra 20 thước tây</h3>
    <h5 class="font-italic">A Notice dated May 2, 1925 on extending Hang Dau street to 20 yards</h5>
    `,
    img_part2_4_mini_1: `
    <h3>Kiểu đô thị đông đúc (phố Hàng Đào)</h3>
    <h5 class="font-italic">Crowded urban area (Hang Dao street)</h5>
    `,
    img_part2_4_mini_2: `
    <h3>Phu xe ở Hà Nội</h3>
    <h5 class="font-italic">Man pulling rickshaw in Hanoi</h5>
    `,
    img_part2_4_mini_3: `
    <h3>Đoàn hộ tống một vị quan ngang qua phố ở Hà Nội</h3>
    <h5 class="font-italic">A mandarin on Hanoi street</h5>
    `,
    img_part2_4_mini_4: `
    <h3>Một góc chợ ở Hà Nội</h3>
    <h5 class="font-italic">A market corner in Hanoi</h5>
    `,
    img_part2_5_mini_1: `
    <h3>Sơ đồ đền Cổ Lương, phố Án Sát Siêu (phố Ngõ Gạch cũ), Hà Nội</h3>
    <h5 class="font-italic">Position plan of Co Luon Temple on An Sat Sieu street (Ngo Gach street), Hanoi</h5>
    `,
    img_part2_6_mini_1: `
    <h3>Phố Hàng Ngang</h3>
    <h5 class="font-italic">Hang Ngang street</h5>
    `,
    img_part2_6_mini_2: `
    <h3>Phố Hàng Điếu</h3>
    <h5 class="font-italic">Hang Dieu street</h5>
    `,
    img_part2_6_mini_3: `
    <h3>Nhà thờ lớn Hà Nội được xây dựng vào các năm 1884 - 1887</h3>
    <h5 class="font-italic">Hanoi Cathedral built in 1884 - 1887 period</h5>
    `,
    img_part2_6_mini_4: `
    <h3>Ô Quan Chưởng</h3>
    <h5 class="font-italic">O Quan Chuong (Quan Chuon Gate - The old East Gate)</h5>
    `,

    /**
     * PART 3 CONTENT
     */
    img_part3_0_full: `
    <h3 class="mb-3">Phần 3: Thành Hà Nội và phụ cận</h3>
    <p>
        Dưới thời Nguyễn, thành Thăng Long – Hà Nội dù không còn giữ vị trí là trung tâm đầu não đất nước song nơi đây vẫn đóng một vai trò chính trị quan trọng. 
        Năm 1802, vua Gia Long đã đặt thành Thăng Long làm thủ phủ của Trấn Bắc thành, quản lý 11 nội ngoại trấn (Bắc Bộ). Vua Gia Long giữ nguyên tên Thăng Long 
        nhưng cho đổi chữ Long trong nghĩa là Rồng thành chữ Long với nghĩa là Thịnh vượng. Năm 1804, điện Kính Thiên, công trình kiến trúc tiêu biểu và nổi tiếng 
        thời Lê trở thành địa điểm chính đặt hành cung của các vị vua triều Nguyễn mỗi khi tuần du ra khu vực phía Bắc. Trong nhiều năm sau này, 
        hành cung ở Thăng Long liên tục được sửa chữa. Năm 1841, vua Thiệu Trị cho xây dựng thêm một số công trình gồm một chính điện 5 gian và một hậu điện, 
        điện Thị Triều, điện Cần Chánh và cửa Chu Tước. Xung quanh hành cung có tường bảo vệ. Cho đến những năm 70 của thế kỷ XIX, hành cung được phản ánh 
        khá rõ trong các ghi chép, các bức ảnh và bản đồ cổ do người Pháp vẽ và đây được coi là “một trong những tuyệt tác của kiến trúc An nam”.
    </p>
    <br>
    `,
    img_part3_0_mini_1: `
    <h3>Đoan Môn thành Hà Nội</h3>
    <h5 class="font-italic">Doan Mon (Main Gate) - Imperial Citadel of Hanoi</h5>
    `,
    img_part3_1_mini_1: `
    <h3>Bản phụng dụ ngày 15 tháng 10 năm Tự Đức thứ 26 (1873) của Viện Cơ mật về việc lện cho Hoàng Kế Viêm, Tôn Thất Thuyết bản định kế hoạch, trấn an tinh thần, cố kết nhân tâm, thu phục hào kiệt, chiêu mộ thủ hạ và khiến người người đồng lòng để sớm thu phục lại thành Hà Nội (1)</h3>
    <h5 class="font-italic">Proposal dated the 15th day of the 10th month of the 26th year of Tu Duc's reign (1873) of the Privy Council on setting up plan to set people's mind, recruit the talented and unify people to recover Hanoi (1)</h5>
    `,
    img_part3_1_mini_2: `
    <h3>Bản phụng dụ ngày 15 tháng 10 năm Tự Đức thứ 26 (1873) của Viện Cơ mật về việc lện cho Hoàng Kế Viêm, Tôn Thất Thuyết bản định kế hoạch, trấn an tinh thần, cố kết nhân tâm, thu phục hào kiệt, chiêu mộ thủ hạ và khiến người người đồng lòng để sớm thu phục lại thành Hà Nội (2)</h3>
    <h5 class="font-italic">Proposal dated the 15th day of the 10th month of the 26th year of Tu Duc's reign (1873) of the Privy Council on setting up plan to set people's mind, recruit the talented and unify people to recover Hanoi (2)</h5>
    `,
    img_part3_1_mini_3: `
    <h3>Bản phụng dụ ngày 15 tháng 10 năm Tự Đức thứ 26 (1873) của Viện Cơ mật về việc lện cho Hoàng Kế Viêm, Tôn Thất Thuyết bản định kế hoạch, trấn an tinh thần, cố kết nhân tâm, thu phục hào kiệt, chiêu mộ thủ hạ và khiến người người đồng lòng để sớm thu phục lại thành Hà Nội (3)</h3>
    <h5 class="font-italic">Proposal dated the 15th day of the 10th month of the 26th year of Tu Duc's reign (1873) of the Privy Council on setting up plan to set people's mind, recruit the talented and unify people to recover Hanoi (3)</h5>
    `,
    img_part3_1_mini_4: `
    <h3>Cửa Bắc thành Hà Nội năm 1884</h3>
    <h5 class="font-italic">Cua Bac (Northern Gate) - Imperial Citadel of Hanoi in 1884</h5>
    `,
    img_part3_1_mini_5: `
    <h3>Tường thành Hà Nội</h3>
    <h5 class="font-italic">The wall of Imperial Citadel of Hanoi</h5>
    `,
    img_part3_2_mini_1: `
    <h3>Bản vẽ thành Hà Nội chỉ dẫn các tuyến phố và công trình chính xây theo phong cách hiện đại do L.Bezacier lập năm 1942 dựa trên các bản vẽ trước đó</h3>
    <h5 class="font-italic">Hanoi Citadel plan with information about main streets and constructions works in modern style made by L.Benzacier in 1942 from previous plans</h5>
    `,
    img_part3_3_mini_1: `
    <h3>Chùa Một Cột</h3>
    <h5 class="font-italic">One-pillar Pagoda</h5>
    `,
    img_part3_3_mini_2: `
    <h3>Sơ đồ vị trí và bản tóm tắt lịch sử chùa Yên Quang còn gọi là chùa Quán Thanh nằm trên đại lộ Grand Boudha (nay là phố Quán Thánh), Hà Nội, tỉ lệ 0.005 (1)</h3>
    <h5 class="font-italic">Position plan of Yen Quang Pagoda (or Quan Thanh Pagoda) on Grand Boudha boulevard (now Quan Thanh street) at 0.005 scale and its history (1)</h5>
    `,
    img_part3_3_mini_3: `
    <h3>Sơ đồ vị trí và bản tóm tắt lịch sử chùa Yên Quang còn gọi là chùa Quán Thanh nằm trên đại lộ Grand Boudha (nay là phố Quán Thánh), Hà Nội, tỉ lệ 0.005 (2)</h3>
    <h5 class="font-italic">Position plan of Yen Quang Pagoda (or Quan Thanh Pagoda) on Grand Boudha boulevard (now Quan Thanh street) at 0.005 scale and its history (2)</h5>
    `,
    img_part3_3_mini_4: `
    <h3>Chùa Yên Quang, hay còn gọi là chùa Quán Thánh</h3>
    <h5 class="font-italic">Yen Quang Pagoda, or Quan Thanh Pagoda</h5>
    `,
    img_part3_3_mini_5: `
    <h3>Bản vẽ mặt trước Dinh Toàn quyền Động Dương (nay là Phủ Chủ tịch) tại Hà Nội, tỉ lệ 1/2000, do kiến trúc sư Charles Lichtenfelder lập năm 1900</h3>
    <h5 class="font-italic">Front elevation of Indochina Governor-General's Palace (the current Presidential Palace) in Hanoi at 1/2000 scale made by Charles Lichtenfelder in 1900</h5>
    `,
    img_part3_4_mini_1: `
    <h3>Bản vẽ Văn Miếu và các khu đất xung quanh, tỉ lệ 1/1000, do Chánh Sở Quản lí Đường bộ lập ngày 2/3/1899 và bản tóm tắt lịch sử ngôi đền (1)</h3>
    <h5 class="font-italic">Plan of Van Mieu (the Temple of Liturature) and its surroundings at 1/1000 scale published by the Department of Road Administration on March 2, 1899 and its brieft history (1)</h5>
    `,
    img_part3_4_mini_2: `
    <h3>Bản vẽ Văn Miếu và các khu đất xung quanh, tỉ lệ 1/1000, do Chánh Sở Quản lí Đường bộ lập ngày 2/3/1899 và bản tóm tắt lịch sử ngôi đền (2)</h3>
    <h5 class="font-italic">Plan of Van Mieu (the Temple of Liturature) and its surroundings at 1/1000 scale published by the Department of Road Administration on March 2, 1899 and its brieft history (2)</h5>
    `,
    img_part3_4_mini_3: `
    <h3>Biên bản cuộc họp ngày 30/5/1940 của Hội đồng thành phố Hà Nội về việc chuyển Hồ Văn cho Văn Miếu</h3>
    <h5 class="font-italic">Minutes of the meeting dated May 30, 1940 conducted by Hanoi Municipal Council on transferring Ha Van to Van Mieu (The Temple of Liturature)</h5>
    `,
    img_part3_4_mini_4: `
    <h3>Toàn cảnh Hồ Văn trước Văn Miếu</h3>
    <h5 class="font-italic">Panorama of Ho Van in front of Van Mieu (The Temple of Liturature)</h5>
    `,
    img_part3_5_mini_1: `
    <h3>Bản vẽ mặt trước và mặt cắt Bích Câu Đạo quán, tỉ lệ 0.04, được Toà Đốc lí phê chuẩn năm 1932</h3>
    <h5 class="font-italic">Front elevation and section of Bich Cau Dao Quan at 0.04 scale approved by the Town Hall in 1932</h5>
    `,
}

/**
 * EVERY CONTENTS OF OBJECTS
 */
const OBJECT_CONTENTS = {
    p2_ganh_hang_rong: `
    <h3 class="mb-3">Gánh hàng rong</h3>
    <p>
    Thực dân Pháp đánh chiếm thành Hà Nội năm 1882 nhưng đến năm 1885, an ninh vẫn phức tạp, quân Cờ Đen nghênh ngang, trộm cướp lộng hành, 
    các quy định do Tòa Đốc lý ban ra chưa nhiều nên hàng rong khá tự do. Trong cuốn "Một chiến dịch ở Bắc kỳ" (Une Campagne au Bắc kỳ, xuất bản 1892), bác sĩ Hocquard, 
    người theo chân quân đội viễn chinh Pháp đã viết về hàng rong: "Một anh bán thịt lợn rong đang rao hàng trên phố, tôi không hiểu ý nghĩa của tiếng rao. Anh mang trên 
    vai một thanh tre dài (đòn gánh), một đầu thanh tre là thịt lợn đã xẻ và đầu kia là chiếc bàn nhỏ, cân cán gỗ và dao…". Hà Nội đã đổi khác khi Chính phủ Pháp chính 
    thức bảo hộ Bắc kỳ và Hà Nội thành nhượng địa năm 1888. Chính quyền thành phố quản lý xã hội theo luật của Pháp quốc, các quy định của triều Nguyễn không còn giá trị. 
    Trong giai đoạn này, thu ngân sách nhiều nhất là thuế chợ gồm: Thuế hàng hóa, chỗ ngồi nên hội đồng thành phố đã quyết định cho tăng số phiên ở chợ Đồng Xuân và các chợ khác. 
    Thành phố cũng ra quyết định đánh thuế người bán hàng rong bằng cách thu theo ngày và họ chỉ được phép dừng gánh ngay sát cửa nhà người mua, tuyệt đối cấm bán trên vỉa hè. 
    Chủ nhà để người bán hàng rong ngồi bán trước cửa nhà sẽ bị phạt.
    </p>
    <p>   
    Để người mua biết mình bán gì, người bán hàng rong buộc phải rao. Cuốn "Quảng tập viêm văn" (Chrestomathie Anamite, xuất bản ở Paris năm 1898), 
    Edmond Nordemann, tác giả cuốn sách đã liệt kê ra 31 mặt hàng bán rong thông qua tiếng rao gồm: Bán cá biển, các loại bánh, hàn nồi, vá võng, 
    thu mua đồ đồng nát… Trong bộ tranh khắc "Kỹ thuật của người An Nam" (Tchnique du Peuple Annamite, xuất bản năm 1912), tác giả Henri Oger đã khắc 
    khá nhiều bức liên quan tới hàng rong như: Bán đồ thủ công, thực phẩm. Khi các khu phố mới được xây dựng ở phía đông và nam Hồ Gươm (ngày nay là phố Ngô Quyền, Lê Phụng Hiểu, 
    Tràng Tiền, Tràng Thi, Hai Bà Trưng, Trần Hưng Đạo…) và phía tây nam (nay là phố Lê Hồng Phong, Cao Bá Quát, Chu Văn An…) đông đúc dân cư là người Pháp và người Việt giàu 
    có thì chính quyền ra lệnh cấm hàng rong không được bán tại những con phố này.
    </p>
    <p>   
    Theo thời gian, hàng hóa bán rong đa dạng hơn. Cuốn "Hàng rong và tiếng rao trên phố Hà Nội" của F.Fénis xuất bản năm 1929 in 28 ký họa do sinh viên Trường Cao đẳng Mỹ thuật Đông Dương 
    vẽ cho thấy có thêm rất nhiều mặt hàng như: Tào phớ, kem, quả dâu, mía đã tiện thành khẩu, báo… Từ năm 1930 đến 1945, cùng với con sen, thằng xe, cơm đầu ghế… hàng rong cũng là đối tượng 
    phản ánh của các nhà văn hiện thực phê phán. Báo "Trung Bắc tân văn" đã đăng truyện ngắn "Hạt ngọc trên phố" của Vũ Sang kể về một bà đầm già ở khu phố nam Hồ Gươm mê món cốm Vòng. 
    Cứ vào mùa, ngày nào bà ta cũng sai con sen gọi cô bán cốm rong đến nhà…
    </p>
    <p>   
    Nữ nhà văn Pháp Hilda Arnhold vô cùng mê tiếng rao của người bán hàng rong và bà đã viết cuốn sách "Bắc kỳ - Phong cảnh và ấn tượng" trong đó tả chi tiết về tiếng rao, thân phận của họ, 
    những người mà theo bà là tầng lớp nghèo trong xã hội. 
    </p>
    <br>
    `,
    p2_rickshaw: `
    <h3 class="mb-3">Xe kéo</h3>
    <p>
    Theo những tài liệu hiện có, xe kéo xuất hiện lần đầu tiên tại Nhật Bản vào những năm cuối thập niên 1860 như một phương tiện tự chế dành cho những phú ông không còn đủ sức lực 
    đi bằng chính đôi chân của mình. Từ cái nôi đó, nó nhanh chóng có mặt tại nhiều nước như Trung Quốc, Hồng Kông, Madagascar, Ấn Độ và vào Việt Nam vào những năm đầu thập kỷ 1880. 
    Tại đây, từ rickshaw do những người sử dụng tiếng Anh dùng để gọi chiếc xe kéo đã được thực dân Pháp chuyển thành từ pousse-pousse và cũng từ đó, tại Hà Nội và các tỉnh phụ cận hình 
    thành một đội ngũ những công nhân được người Việt gọi là phu kéo xe, còn thực dân Pháp gọi là coolies-pousse.
    </p>
    <p>   
    Nghe đâu việc nhập xe kéo vào Việt Nam là sáng kiến của một viên chức Pháp tên Bonnal, sau là quyền Thống sứ Bắc kỳ (1886-1887). Lúc đầu, việc khai thác loại phương tiện chuyên chở này 
    được dành độc quyền cho những người có “máu mặt”, song theo Claude Bourrin, tác giả quyển Le vieux Tonkin 1890-1894 (Xứ Bắc kỳ những năm 1890-1894), tại Hà Nội, độc quyền khai thác xe kéo bị 
    bãi bỏ từ ngày 31.12.1890. Cũng từ ấy, người ta ít thấy những chiếc xe kéo tồi tàn, những bác phu xe ăn mặc nhếch nhác. Thay vào đó là những chiếc xe mới có tên là Les Tonkinois (người Bắc kỳ), 
    cao ráo, bánh sơn đỏ, thùng xe sơn xanh, có một ô sơn trắng dành để kẻ tên và số đăng ký màu đỏ. Người phu xe cũng ăn mặc quần áo trắng, trông sạch sẽ gọn gàng hơn trước. Xe kéo của những chủ nhân người 
    Hoa thì khác. Bánh xe sơn màu trắng hoặc màu xanh lơ, người phu xe mặc áo cổ màu xanh dương, đỏ hay xanh lục. Những nhà giàu có sắm hẳn một chiếc xe kéo, nuôi luôn người phu xe trong nhà để điều động mỗi khi cần đi đâu. 
    Người ta kể rằng xe của các vị quan to, ngoài người phu xe cắm cúi chạy, còn có một lính hầu chạy theo bên cạnh, tay cầm sẵn xe điếu để khi cần, quan dừng lại bên đường, rít một hơi thuốc. 
    Các bà mệnh phụ cũng thế, nhưng thay vào chỗ điếu cày là tráp đựng trầu cau.
    </p>
    <br>
    `,
    p2_chinese_lattern: `
    <h3 class="mb-3">Đèn lồng giấy</h3>
    <p>
    Đây là một loại đèn quen thuộc đối với các nền văn hóa Á Đông. Chúng có nhiều hình dạng và kích thước khác nhau, cũng như những cách thức chế tạo khác nhau. 
    Đèn lồng loại đơn giản nhất là được làm bằng giấy và gắn cây nến bên trong, còn phức tạp hơn thì có khung tre xếp được hoặc khung kim loại, có giấy dán căng bao phía ngoài...
    </p>
    <br>
    `
}