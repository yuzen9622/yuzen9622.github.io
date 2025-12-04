# **H1 主標題 (Heading 1\)**

這是一段標準的段落文字。Lorem ipsum dolor sit amet, consectetur adipiscing elit. 用於測試基本的字體大小、行高以及段落間距。

## **H2 次標題 (Heading 2\)**

### **H3 小標題 (Heading 3\)**

#### **H4 標題 (Heading 4\)**

##### **H5 標題 (Heading 5\)**

###### **H6 標題 (Heading 6\)**

## **1. 文字格式 (Text Formatting)**

這段測試各種行內樣式：

- **粗體文字 (Bold)**
- _斜體文字 (Italic)_
- **_粗斜體混合 (Bold and Italic)_**
- ~~刪除線 (Strikethrough)~~
- 行內程式碼 (Inline Code)
- [這是一個超連結 (Link)](https://google.com)
- [帶有 Title 的超連結](https://google.com)
- <sub>下標 (Subscript)</sub> 與 <sup>上標 (Superscript)</sup> (若渲染器支援 HTML)

## **2. 列表 (Lists)**

### **無序列表 (Unordered List)**

- 列表項目 1
- 列表項目 2
  - 巢狀列表 A
  - 巢狀列表 B
    - 第三層列表
- 列表項目 3

### **有序列表 (Ordered List)**

1. 第一步驟
2. 第二步驟
3. 第三步驟
   1. 子步驟 3-1
   2. 子步驟 3-2

### **待辦清單 (Task List)**

- [x] 已完成的任務
- [ ] 待處理的任務 A
- [ ] 待處理的任務 B

## **3. 引用 (Blockquotes)**

這是第一層引用區塊。  
這是一段很長的文字，用來測試換行之後的引用樣式是否正常顯示。  
這是第二層巢狀引用。  
可以在這裡放入 粗體 或 程式碼。

回到第一層引用。

## **4. 程式碼區塊 (Code Blocks)**

### **JavaScript (Syntax Highlighting)**

```js
// 歡迎訊息函式
function welcome(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return true;
}

welcome("Markdown User");
```

### **Python**

```python
def fibonacci(n):
 if n <= 0:
 return 0
 elif n == 1:
 return 1
 else:
 return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### **純文字 (Plain Text)**

這是一塊沒有語法高亮的純文字區塊。  
通常用於顯示 Log 或設定檔。

## **5. 表格 (Tables)**

測試表格的置中、靠左與靠右對齊功能：

| 功能 (靠左) | 描述 (置中)  | 狀態 (靠右) |
| :---------- | :----------- | :---------- |
| 標題渲染    | H1 \~ H6     | Pass        |
| 表格對齊    | Center/Right | OK          |
| 數學公式    | LaTeX        | **Pending** |
| 樣式測試    | Code         | _Italic_    |

## **6. 數學公式 (LaTeX)**

注意：需確保您的環境支援 MathJax 或 KaTeX。

行內公式 (Inline):  
質能守恆公式為 $E = mc^2$。  
**區塊公式 (Block Display):**

$$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2\pi i \xi x} \,d\xi$$  
矩陣範例：

$$M = \begin{bmatrix} 1 & 0 \\\ 0 & 1 \end{bmatrix}$$

## **7. 圖片與媒體 (Images)**

**標準圖片：**

**帶連結的圖片 (點擊可跳轉)：**

## **8. 其他元素**

### **水平分隔線 (Horizontal Rules)**

### **摺疊區塊 (Details/Summary)**

<details>  
<summary>點擊此處展開詳細內容</summary>  
這裡是隱藏的詳細資訊。  
可以用來放置較長的 Log 或補充說明，避免佔用過多版面。

1. 支援
2. 列表

</details>

### **註腳 (Footnotes)**

這是一個帶有註腳的句子[^1](http://docs.google.com/這是第一個註腳的解釋內容。)，這是另一個註腳[^2](http://docs.google.com/這是第二個註腳，通常會顯示在文章最底部。)。
