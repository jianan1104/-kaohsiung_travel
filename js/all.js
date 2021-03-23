var index_page;
var data;
var zip_area = ["鼓山區", "林園區", "旗山區", "大樹區", "鳳山區", "那瑪夏", "三民區", "岡山區", "前鎮區", "旗津區", "橋頭區", "鳥松區", "苓雅區", "左營區", "內門區", "美濃區", "鹽埕區", "前金區", "湖內區", "大寮區", "燕巢區", "六龜區", "田寮區", "茂林區", "桃源區", "小港區", "新興區", "永安區", "杉林區", "大社區", "楠梓區", "彌陀區", "梓官區", "茄萣區", "仁武區", "阿蓮區", "路竹區", "甲仙區"];

init();

// Function Define

function init(){
    DataParser();
    var qHotList = document.querySelector('.hot-area');
    var location = document.querySelector('#location')
    qHotList.addEventListener('click', RenderList);
    location.addEventListener('change', RenderList);
    
    var inner = "";
    for(var i=0;i<zip_area.length;i++){
        inner = inner +`<option value=${zip_area[i]}>` + zip_area[i] + '</option>';
    }
    location.innerHTML = inner;
    
    
}


function DataParser(){
    var xhr, url, isDone;
    xhr = new XMLHttpRequest();
    url = 'https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c';
    xhr.open('get', url, true);
    xhr.send(null);
    xhr.addEventListener('load', function(){
        data = JSON.parse(xhr.responseText).data.XML_Head.Infos.Info;
        return true
    })
}

function UpateList(){
    var OpenTime, Address, Tel, Name, area, Path2Pic;
    var cardDOM = document.querySelector('.card-list');
    var card = document.createElement('li');
    var top = document.createElement('div');
    var btm = document.createElement('div');
    var detail = document.createElement('ul')
    var detail_li = document.createElement('li')

    card.setAttribute('class', 'card');
    top.setAttribute('class', 'top-image');
    btm.setAttribute('class', 'detail');
    detail.setAttribute('class', 'card-list');
    detail_li.setAttribute('class', 'card');
    
    for(var idx=0;idx<2;idx++){
        OpenTime = data[idx].Opentime;
        Address = data[idx].Add;
        Tel = data[idx].Tel;
        Name = data[idx].Name;
        area = data[idx].Zipcode;
        Path2Pic = data[idx].Picture1;

        //document.querySelector('.top-image').style.backgroundImage = Path2Pic;
        card.appendChild(top);
        cardDOM.appendChild(card);
    }
}

function RenderList(e){
    var select = e.target.value
    var cardDOM = document.querySelector('.card-list');
    var itemcnt = 0
    cardDOM.innerHTML = ''
    if(e.target.nodeName == 'INPUT' || e.target.nodeName == 'SELECT'){
        var page_num = Math.ceil(data.length/10);
        for(var idx=0;idx<data.length;idx++){
            if(select == (data[idx].Add).slice(6,9) || select == '全部區域'){
                var OpenTime, Address, Tel, Name, area, Path2Pic;
                var card = document.createElement('li');
                var top = document.createElement('div');
                var btm = document.createElement('div');
                var detail = document.createElement('ul')
                var li_time = document.createElement('li')
                var li_address = document.createElement('li')
                var li_tel = document.createElement('li')
                var icon_time = document.createElement('img')
                var icon_address = document.createElement('img')
                var icon_tel = document.createElement('img')
                var h3_name = document.createElement('h3')
                var p_area = document.createElement('p')

                card.setAttribute('class', 'card');
                top.setAttribute('class', 'top-image');
                btm.setAttribute('class', 'detail');

                icon_time.src = 'assets/icons_clock.png';   icon_address.setAttribute('src', 'assets/icons_pin.png');    icon_tel.setAttribute('src', 'assets/icons_phone.png')

                OpenTime = data[idx].Opentime;
                Address = data[idx].Add;
                Tel = data[idx].Tel;
                Name = data[idx].Name;
                area = data[idx].Zipcode;
                Path2Pic = data[idx].Picture1;

                h3_name.textContent = Name
                p_area.textContent = Address.slice(6,9)
                top.appendChild(h3_name)
                top.appendChild(p_area)
                top.setAttribute('style', `background-image : url(${Path2Pic});`);
                card.appendChild(top);
                
                li_time.innerHTML = icon_time.outerHTML + OpenTime;    li_address.innerHTML = icon_address.outerHTML + Address;  li_tel.innerHTML = icon_tel.outerHTML + Tel
                detail.appendChild(li_time);                           detail.appendChild(li_address);                           detail.appendChild(li_tel);
                btm.appendChild(detail)
                card.appendChild(btm);
                cardDOM.appendChild(card);
            }
        }
    }
}