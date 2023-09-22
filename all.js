// // {
// <li>
//     <label class="checkbox" for="">
//         <input type="checkbox" />
//         <span>把冰箱發霉的檸檬拿去丟</span>
//     </label>
//     <a href="#" class="delete">
//         <span class="material-icons"> clear </span>
//     </a>
// </li>;
// // }

//初始化資料
//資料提取處(data)
let data = [
    {
        content: "test",
        checked: "false",
    },
    {
        content: "test",
        checked: "false",
    },
    {
        content: "test",
        checked: "false",
    },
    {
        content: "test",
        checked: "false",
    },
    {
        content: "test",
        checked: "false",
    },
];

const list = document.querySelector(".list");
//renderData將作用於class為list 的ul欄位
const save = document.querySelector(".save");
//儲存按鈕
const txt = document.querySelector(".txt");
//新增待辦事項(填寫區域)

const filter = document.querySelector(".filter");
const all = document.querySelector(".allThing");
const undone = document.querySelector(".undone");
const done = document.querySelector(".done");

function renderData() {
    let str = ""; //用來組字串的放置區
    data.forEach(function (item, index) {
        //依照data內每個{}帶入他們的content(這邊只有單項),跟索引index
        str += `<li class="flex">
                <label class="checkbox" for="">
                    <input type="checkbox" class="check" data-num=${index} />
                    <span>${item.content}</span>
                </label>
                <a href="#" class="delete" >
                    <span data-name="delete" data-num=${index} class="material-icons"> clear </span>
                </a>
            </li>`;
    });
    list.innerHTML = str; //對list區塊 放入那些li跟按鈕來達成待辦事項新增
}

renderData();
//新增功能
save.addEventListener("click", function (e) {
    if (txt.value == "") {
        //驗證是否空白
        alert("請勿空白");
        return;
    }
    // console.log(txt.value);
    let obj = {}; //用來放置value的區域
    obj.content = txt.value;
    //obj.content的意思是原本為空物件的obj裡新增一個名為content的屬性(跟我們的data一樣) 將value帶進去
    data.push(obj); //因為是照著順序排列所以只要透過push()放到最後一個就好
    txt.value = ""; //這個動作是將已經push完的自己打的值清除 讓填寫欄變乾淨等待下一次填寫，提升使用者體驗

    renderData(); //初始化一次將新資料帶入畫面
});

//刪除功能
list.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-name") !== "delete") {
        return; //如果按到的項目不是data-name則不行動
    }
    let num = e.target.getAttribute("data-num");
    //抽取該按鈕被放入的data-num
    data.splice(num, 1); //清除該項目
    renderData(); //在重新初始化刪除過後的renderData()裡的str讓資料顯示
});

list.addEventListener("click", (e) => {
    if (e.target.getAttribute("class") !== "check") {
        return; //點在checkbox之外沒用
    }
    const check = e.target.checked;
    //確認checkbox是否被點擊 true or false
    console.log(check);
    //在裡面設置data-num針對單一項目進行checked屬性的切換
    //為後續待完成已完成頁面做篩選用途
    let num = e.target.getAttribute("data-num");
    console.log(num);
    if (data[e.target.getAttribute("data-num")].checked === "false") {
        data[e.target.getAttribute("data-num")].checked = "true";
    } else {
        data[e.target.getAttribute("data-num")].checked = "false";
    }
});

filter.addEventListener("click", function (e) {
    let str = ""; //用來組字串的放置區
    data.forEach(function (item, index) {
        //依照data內每個{}帶入他們的content(這邊只有單項),跟索引index
        str += `<li class="flex">
                <label class="checkbox" for="">
                    <input type="checkbox" class="check" data-num=${index} />
                    <span>${item.content}</span>
                </label>
                <a href="#" class="delete" >
                    <span data-name="delete" data-num=${index} class="material-icons"> clear </span>
                </a>
            </li>`;
    });
    list.innerHTML = str; //對list區塊 放入那些li跟按鈕來達成待辦事項新增
});

filter.addEventListener("click", function (e) {
    console.log(e.target.getAttribute("class"));

    if (e.target.getAttribute("class") !== "undone") {
        return;
    }
    let str = "";
    data.forEach(function (item, index) {
        if (item.checked == "false") {
            str += `<li class="flex">
            <label class="checkbox" for="">
                <input type="checkbox" class="check" data-num=${index} />
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" >
                <span data-name="delete" data-num=${index} class="material-icons"> clear </span>
            </a>
        </li>`;
        }
    });
    list.innerHTML = str;
});

filter.addEventListener("click", function (e) {
    console.log(e.target.getAttribute("class"));

    if (e.target.getAttribute("class") !== "done") {
        return;
    }
    let str = "";
    data.forEach(function (item, index) {
        if (item.checked == "true") {
            str += `<li class="flex">
            <label class="checkbox" for="">
                <input type="checkbox" class="check" data-num=${index} />
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" >
                <span data-name="delete" data-num=${index} class="material-icons"> clear </span>
            </a>
        </li>`;
        }
    });
    list.innerHTML = str;
});
