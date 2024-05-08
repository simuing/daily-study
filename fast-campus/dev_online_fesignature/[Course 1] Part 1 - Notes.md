## Ch1. 개요

**수강 정보**: 프론트엔드 웹 개발의 모든 것 초격차 패키지 Online

<br/>

### 웹앱의 동작 방식
#### Web Application
1. 사용자는 디바이스에 설치된 브라우저를 통해 사이트에 접근
2. 해당 사이트의 주소에 맞는 서버로 최초의 요청이 들어감
3. 최초의 요청을 받은 서버는 그 사용자의 브라우저로 최초의 응답을 내어줌
4. 응답을 통해서 나가는 파일은 기본적인 웹사이트의 구조를 담고 있는 HTML이 응답이 됨
5. 브라우저는 그 구조에 맞게 작성되어져 있는 CSS/JS/JPG 등의 파일들에 대한 추가 요청을 서버에 보냄
6. 서버는 추가 응답을 내어줌

<br/>

### 웹 표준과 브라우저

#### 웹 표준
웹 표준(Web Standard)이란 '웹에서 사용되는 표준 기술이나 규칙'을 의미, W3C의 표준화 제정 단계의 '권고안(REC)'에 해당하는 기술.


#### 크로스 브라우징
크로스 브라우징(Cross Browsing)이란 조금은 다르게 구동되는 여러 브라우저에서 동일한 사용자 경험(같은 화면, 같은 동작 등)을 줄 수 있도록 제작하는 기술, 방법

<br/>

### 웹에서 사용되는 이미지

#### 웹 이미지
비트맵(Bitmap)과 벡터(Vector)
- Bitmap: 픽셀이 모여 만들어진 정보의 집합, 레스터(Raster) 이미지라고도 부름.
- Vector: 점, 선, 면의 위치(좌표), 색상 등 수학적 정보의 형태(Shape)로 이루어진 이미지.

#### WEBP
JPG, PNG, GIF 모두 대체할 수 있는 구글이 개발한 이미지 포맷
- 완벽한 손실/비손실 압축 지원
- GIF 같은 애니메이션 지원
- 투명도 지원 (Alpha Channal)

#### SVG(Scalable Vector Graphics)
마크업 언어(HTML/XML) 기반의 벡터 그래피을 표현하는 포맷.
- 해상도의 영향에서 자유로움
- CSS/JS로 제어 가능
- 파일 및 코드 삽입 가능

<br/>

### 특수 기호
- ` : Backtick, Grave(백틱, 그레이브)
- ~ : Tilde(틸드, 물결 표시)
- ! : Exclamation mark(엑스클러메이션, 느낌표)
- @ : At sign(앳, 골뱅이)
- \# : Sharp, Number sign(샵, 넘버, 우물 정)
- $ : Dollar sign(달러)
- ^ : Caret(캐럿)
- & : Ampersand(엠퍼센드)
- \* : Asterisk(에스터리스크, 별표)
- \- : Hyphen, Dash(하이픈, 대시, 마이너스)
- _ : Underscore, Low dash(언더스코어, 로대시, 밑줄)
- = : Equals sign(이퀄, 동등)
- " : Quotation mark(쿼테이션, 큰 따옴표)
- ' : Apostrophe(아포스트로피, 작은 따옴표)
- : : Colon(콜론)
- ; : Semicolon(세미콜론)
- , : Comma(콤마, 쉼표)
- . : Period, Dot(피리어드, 닷, 점, 마침표)
- / : Slash(슬래시)
- | : Vertical bar(버티컬 바)
- \ : Backslash(백슬래시, 역 슬래시)
- () : Parenthesis(퍼렌서시스, 소괄호, 괄호)
- {} : Brace(브레이스, 중괄호)
- [] : Bracket(브래킷, 대괄호)
- <> : Angle Bracket(앵글 브래킷, 꺽쇠괄호)

<br/>

### 오픈 소스 라이선스
오픈소스란 어떤 제품을 개발하는 과정에 필요한 소스 코드나 설계도를 누구나 접근해서 열람할 수 있도록 공개하는 것.
- OpenSource.org
- 저작권은 별도로 확인해야 한다.

#### Apache License
- 아파치 소프트웨어 재단에서 자체 소프트웨어에 적용하기 위해 만든 라이선스.
- 개인적/상업적 이용, 배포, 수정, 특허 신청이 가능

#### MIT License
- 매사추세츠공과대학(MIT)에서 소프트웨어 학생들을 위해 개발한 라이선스.
- 개인 소스에 이 라이선스를 사용하고 있다는 표시만 지켜주면 된다.
- 나머지 사용에 대한 제약이 없다.

#### BSD License
- BSD(Berkeley Software Distribution)는 버클리 캘리포니아대학에서 개발한 라이선스, MIT와 거의 동일하다.

#### Beerware
- 오픈소스 개발자에게 맥주를 사줘야 하는 라이선스.
- (만날 수 있는 경우)

<br/>

## Ch 2. VS Code

#### 유용한 확장 프로그램

1. Auto Rename Tag: Automatically rename paired HTML/XML tag, same as Visual Studio IDE does.
2. Live Server: Launch a local development server with live reload feature for static & dynamic pages.

<br/>

## Ch 3. 무작정 시작하기

#### Doctype(DTD)
```html
<!DOCTYPE html> <!-- html: 문서의 HTML 버전을 지정 -->
<html>
    <head>
      <!-- 문서의 정보 -->
    </head>
    <body>
      <!-- 문서의 구조 -->
    </body>
</html>
```
DOCTYPE(DTD, Document Type Definition)은 마크업 언어에서 문서 형식을 정의하며, 웹 브라우저가 어떤 HTML 버전의 해석 방식으로 페이지를 이해하면 되는지를 알려주는 용도.

#### link tag
```html
<link rel="stylesheet" href="./main.css" />
```
외부 문서를 가져와 연결할 때 사용. (대부분 CSS파일)
rel(Relationship 단어의 약어)은 가져올 외부 문서(대표적으로 CSS 파일)가 현재의 HTML과 어떤 관계인지를 명시하는 HTML 속성(Attribute)이다.

#### 상대 경로 vs 절대 경로

상대경로
```
./ (생략 가능) ==> 주변
../ ==> 상위 폴더
```

절대 경로
```
http (https) ==> 원격
/ (//) ==> 루트
```

<br/>

## Ch 4. 웹에서 시작하기

#### 브라우저 스타일 초기화
reset.css cdn 파일을 활용하여 브라우저 스타일을 초기화 할 수 있다.
https://www.jsdelivr.com/package/npm/reset-css

```
/**
 * Minified by jsDelivr using clean-css v5.3.2.
 * Original file: /npm/reset-css@5.0.1/reset.css
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}menu,ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
/*# sourceMappingURL=/sm/04f4d35563f7cf9516264fcbb6e11a85def2ae5616df66563711867fe05befec.map */
```

#### Emmet
코드 자동 완성 기능. VS Code에서 기본적으로 제공되는 부분이 있으며 관련 플러그인들의 도움을 받을 수 있다.

<br/>

## Ch5. HTML 개요

#### 글자와 상자
요소가 화면에 출력되는 특성을 크게 2가지로 구분할 수 있다.
1. Inline 요소: 글자를 만들기 위한 요소들. 
  - 인라인 요소 `<span></span>`
  - 요소가 수평으로 쌓임
2. Block 요소: 상자(레이아웃)을 만들기 위한 요소들. 
  - 대표적인 블록 요소 `<div></div>`
  - 요소가 수직으로 쌓임

<br/>

## Ch6. HTML 핵심 정리

#### 주석

```html
<!-- Comment -->
수정사항이나 설명 등을 작성, 브라우저는 이 태그를 해석하지 않기 때문에 화면에 내용이 표시되지 않음.
```

#### data set
```html
<태그 data-이름="데이터"></태그>
```
JS에서 많이 사용되는 data, 요소에 데이터를 지정한다.

<br/>

## Ch6. CSS 개요

```css
선택자 { 속성: 값; }
/* CSS 주석 */
```
선택자: 스타일(CSS)을 적용할 대상(Selector)
속성: 스타일(CSS)의 종류(Property)
값: 스타일(CSS)의 값(Value)
CSS 주석: 브라우저는 이 범위를 해석하지 않는다.


#### CSS 선언 방식
1. **내장 방식**: head 태그 내에 style 태그로 스타일을 작성
```html
<style>
  div { }
</style>
```
2. **링크 방식**: link 태그로 외부 CSS 문서를 가져와서 연결
```html
<link rel="stylesheet" href="./css/main.css" />
```

3. **인라인 방식**: 요소의 style 속성에 직접 스타일을 작성
```html
<div style="color: red;"></div>
```
4. @import 방식: CSS의 `@import` 규칙으로 CSS 안에서 또 다른 CSS 문서를 가져와 연결하는 방식
```css
@import url("./box.css");
```


#### CSS 선택자

선택자 종류: `기본`, `복합`, `가상 클래스`, `가상 요소`, `속성`

```css
/* 기본 선택자 */

/* 전체 선택자(Universal Selector): 모든 요소를 선택 */
* {}
/* 태그 선택자(Type Selector): 태그 이름이 [apple]인 요소 선택 */
apple {}
/* 아이디 선택자(ID Selector): HTML id 속성의 값이 [apple]인 요소 선택 */
#apple {}
/* 클래스 선택자(Class Selector): HTML class 속성의 값이 [apple]인 요소 선택 */
.apple {}
```
```css
/* 복합 선택자 */

/* 일치 선택자(Basic Combinator): 두 선택자를 동시에 만족하는 요소 선택 */
span.apple {}
/* 자식 선택자(Child Combinator): 선택자의 자식 요소 선택 */
div > .apple {}
/* 하위(후손) 선택자(Descendant Combinator): 선택자의 하위 요소 선택, '띄어쓰기'가 선택자의 기호이다. */
div .apple {}
/* 인접 형제 선택자(Adjacent Sibling Combinator): 선택자의 다음 형제 요소 하나를 선택 */
.apple + li {}
/* 일반 형제 선택자(General Sibling Combinator): 선택자의 다음 형제 요소 모두를 선택 */
.apple ~ li {}
```

```css
/* 가상 클래스 선택자(Pseudo-Classes) */

/* HOVER: 선택자 요소에 마우스 커서가 올라가 있는 동안 선택 */
a:hover {}
/* ACTIVE: 선택자 요소에 마우를 클릭하고 있는 동안 선택 */
a:active {}
/* FOCUS: 선택자 요소가 포커스되면 선택 */
input:focus {}

/* First Child: 선택자가 형제 요소 중 첫째라면 선택 */
.apple:first-child {}
/* Last Child: 선택자가 형제 요소 중 막내라면 선택 */
.apple:last-child {}
/* NTH Child: 선택자가 형제 요소 중 (n)째라면 선택, n은 0부터 시작(Zero-Based Numbering) */
.apple:nth-child(2) {}
```

```css
/* 부정 선택자(Negation) */

/* NOT: 선택자가 아닌 요소 선택 */
.fruits *:not(span) {}
```

```css
/* 가상 요소 선택자(Pseudo-Elements) */

/* Before: 선택자 요소의 내부 앞에 내용(Content)을 삽입 */
.box::before { content: '-'; }
/* Before: 선택자 요소의 내부 뒤에 내용(Content)을 삽입 */
.box::after { content: '-'; }
```

```css
/* 속성 선택자(Attribute) */

/* ATTR: 해당 속성을 포함한 요소 선택 */
[type="password"] {}
```

<br/>

#### 선택자 우선순위

1. 점수가 높은 선언이 우선한다.
2. 점수가 같으면, 가장 마지막에 해석된 선언이 우선한다.
```
ID 선택자: 100점
Class 선택자: 10점
태그 선택자: 1점
전체 선택자: 0점
!important: 9999999999점
인라인 선언: 1000점
```
점수 예시
```css
[ 21점]  .list li.item {}
[ 21점]  .list li:hover {}
[ 11점]  .box::before {}
[101점]  #submit span {}
[ 22점]  header .menu li:nth-child(2) {}
[  1점]  h1 {}
[ 10점]  :not(.box) {}
```

<br/>

## Ch 8. CSS 속성

속성 영어 의미
```
HTML 속성(Attributes)
CSS 속성(Properties)
JS 속성(Properties)
```

#### 단위
- px: 픽셀
- %: 상대적 백분율
- em: 요소의 글꼴 크기
- rem: 루트 요소(html)의 글꼴 크기
- vw: 뷰포트 가로 너비의 백분율
- vh: 뷰포트 세로 너비의 백분율

#### 외부 여백(margin)
- 0: 외부 여백 없음
- auto: 브라우저가 여백을 계산, 가운데 정렬에 활용됨
- 단위: px, em, vw 등 단위로 지정
- %: 부모 요소의 가로 너비에 대한 비율로 지정
- 음수 사용 가능

여백 설정 방법
1. margin: `top, right, bottom, left`;
2. margin: `top, bottom`, `left, right`;
3. margin: `top,` `left, right,` `bottom`;
4. margin: `top,` `right,` `bottom,` `left`;
5. margin-방향
  a. `margin-top: ;`
  b. `margin-bottom: ;`
  c. `margin-left: ;`
  d. `margin-right: ;`


#### 내부 여백(padding)
- 0: 내부 여백 없음
- 단위: px, em, vw 등 단위로 지정
- %: 부모 요소의 가로 너비에 대한 비율로 지정

여백 설정 방법
1. padding: `top, right, bottom, left`;
2. padding: `top, bottom`, `left, right`;
3. padding: `top,` `left, right,` `bottom`;
4. padding: `top,` `right,` `bottom,` `left`;
5. padding-방향
  a. `padding-top: ;`
  b. `padding-bottom: ;`
  c. `padding-left: ;`
  d. `padding-right: ;`

#### 색상 표현 종류
`색상 이름` `Hex 색상코드` `RGB` `RGBA` `HSL` `HSLA`

#### 변환
