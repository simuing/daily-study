# Subclass Sandbox

// writing..

## Intent

The subclass sandbox pattern describes a basic idea, while not having a lot of detailed mechanics. You will need the pattern when you have several similar subclasses. If you have to make a tiny change, then change the base class, while all subclasses shouldn't have to be touched. So the base class has to be able to provide all of the operations a derived class needs to perform.

## Applicability

The Subclass Sandbox pattern is a very simple, common pattern lurking in lots of codebases, even outside of games. If you have a non-virtual protected method laying around, you’re probably already using something like this. Subclass Sandbox is a good fit when:

You have a base class with a number of derived classes.
The base class is able to provide all of the operations that a derived class may need to perform.
There is behavioral overlap in the subclasses and you want to make it easier to share code between them.
You want to minimize coupling between those derived classes and the rest of the program.

#### Source URLs

- https://java-design-patterns.com/

<hr>

### [book] 자바스크립트 패턴과 테스트

#### 11.1.1 위젯 샌드박스 만들기

승현과 샬럿이만든 서비스를 통해 콘퍼런스 자원봉사자는 참가인을 체크인하고, 행사장 근처의 음식점 정보를 찾을 수 있게 되었다. 여기에 한 가지 더해, 콘퍼런스 행사의 상황을 파악할 수 있는 대시보드가 있었으면 좋겠다고 주최 담당자는 말한다.

승현과 샬럿은 데이터를 보여주는 대시보드 각 부분을 `위젯`이라고 칭하고 구성 요소 간 결합도를 낮추기 위해 `위젯`을 각각 자신의 `샌드박스`에 가두기로 한다.

<br/>

##### 위젯 샌드박스를 인스턴스화

`WidgetSandbox` 생성자 함수는 `new` 키워드를 사용해야 하고, 적어도 하나의 인자, 즉 `샌드박스`에 격리할 `위젯` 생성 함수를 받도록 작성한다. 먼저, 기능 점검용 단위 테스트를 만들어보자(예제 11-1)

###### 11-1 WidgetSandbox 생성자 함수의 초기 단위 테스트

```javascript
describe("Conference.WidgetSandbox", function () {
  "use strict";

  describe("생성자 함수", function () {
    // 첫 번째 테스트: new 키워드를 사용하여 WidgetSandbox를 실행했는지 체크한다.
    it("'new' 키워드로 실행하지 않으면 예외를 던진다", function () {
      expect(function shouldThrow() {
        var sandbox = Conference.WidgetSandbox();
      }).toThrowError(Conference.WidgetSnadbox.messages.mustBeCalledWithNew);
    });

    // 두 번째 테스트: 샌드박스에 격리할 위젯 인스턴스 생성 함수를 정확히 전달했는지 확인한다.
    it("위젯 함수가 누락되면 예외를 던진다", function () {
      [null, undefined, 1, "SomeString", false].forEach(function testInvalid(notAFcn) {
        expect(function shouldThrow() {
          var sandbox = new Conference.WidgetSandbox(notAFcn);
        }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
      });
    });

    // 세 번째 테스트: 샌드박스 인스턴스 인자를 받아 위젯 함수가 잘 실행되는지 살핀다.
    it("sandbox를 인자로 함수를 실행한다", function () {
      var widgetFcn = jasmine.createSpy();
      var sandbox = new Conference.WidgetSandbox(widgetFcn);
      expect(widgetFcn).toHaveBeenCalledWith(sandbox);
    });
  });
});
```

###### 예제 11-2 WidgetSandbox 생성자 함수의 초기 구현부

```javascript
var Conference = Conference || {};

Conference.WidgetSandbox = function() {
  'use strict';

  // Conference.WidgetSandbox(...)를 new로 실행했는지 보장한다.
  if (!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  var widgetFunction = arguments[0];

  if (type widgetFunction !== "function") {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  widgetFunction(this);
};

Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew = "WidgetSandbox 함수는 반드시 new로 호출해야 합니다",
  fcnMustBeProvided = "위젯 함수는 필수 입력 항목입니다"
};
```

여기까지 `WidgetSandbox` 초기 구현부를 테스트하면 성공한다.

<br/>

#### 샌드박스로 위젯에 도구를 제공

- `WidgetSandbox`의 목표는 대시보드 위젯 간 결합도를 낮추고 떼어놓는 일이다.
- `WidgetSandbox` 이 주변 환경과 소통할 수 있게끔 도구 세트가 필요하다.
  1. 도구는 어디에 정의하나?
  2. 도구를 어떻게 `WidgetSandbox` 인스턴스에 추가하나?
  3. 위젯이 사용 가능한 도구를 어떻게 지정하나?

<br/>

#### `WidgetSandbox` 의 도구 세팅

##### 1. Conference.WidgetTools 이름공간 내에 도구를 정의하는 게 맞다.

##### 2. 도구를 모듈로 정의하면 도구마다 모듈 함수가 `WidgetSandbox` 인스턴스를 받고, 다음 코드처럼 도구가 스스로를 `WidgetSandbox` 프로퍼티에 추가한다.

```javascript
Conference.WidgetTools.toolA = function (sandbox) {
  // toolA를 sandbox에 추가한다.
  sandbox.toolA = {
    function1: function () {
      // function1 구현부
    },
    function2: function () {
      // function2 구현부
    },
  };
};
```

##### 3. `WidgetSandbox` 생성자는 다음 둘 중 하나를 받는다.

```javascript
// 첫 번째 인자는 위젯에서 쓸 도구명이 담긴 배열, 두 번째 인자는 위젯 함수다.
var weatherSandbox = new Conference.WidgetSandbox(["toolA", "toolB"], Conference.widgets.weatherWidget);

// 도구명을 개별 인자로 죽 나열하고 위젯 함수를 제일 마지막 인자에 넣는다.
var weatherSandbox = new Conference.WidgetSandbox("toolA", "toolB", Conference.widgets.weatherWidget);
```

위젯 함수는 맨 끝에, 위젯 도구는 맨 처음부터 등장한다.

<br/>

###### 예제 11-3 도구를 지정하여 `WidgetSandbox` 생성자 함수를 테스트

```javascript
describe("Conference.WidgetSandbox", function () {
  "use strict";

  describe("생성자 함수", function () {
    it("'new' 키워드로 실행하지 않으면 예외를 던진다", function () {
      expect(function shouldThrow() {
        var sandbox = Conference.WidgetSandbox();
      }).toThrowError(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
    });

    describe("new WidgetSandbox(toolsArray, widgetModule)", function () {
      // 도구 목록을 배열 형태로 넘겼을 때 작동 여부를 테스트

      it("위젯 함수가 누락되면 예외를 던진다", function () {
        [null, undefined, 1, "SomeString", false].forEach(function testInvalid(val) {
          expect(function shouldThrow() {
            var sandbox = new Conference.WidgetSandbox(["too1", "too2"], val);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it("sandbox를 인자로 위젯 함수를 실행한다", function () {
        var widgetFcn = jasmine.createSpy();
        var sandbox = new Conference.WidgetSandbox(["tool1", "tool2"], widgetFcn);
        expect(widgetFcn).toHaveBeenCalledWith(sandbox);
      });
    });

    describe("new WidgetSanbox('tool1', ..., 'toolN', widgetModule)", function () {
      // 도구 목록을 개별 인자 형태로 넘겼을 때 작동 여부를 테스트

      it("위젯 함수가 누락되면 예외를 던진다", function () {
        [null, undefined, 1, "SomeString", false].forEach(function testInvalid(val) {
          expect(function shouldThrow() {
            var sandbox = new Conference.WidgetSandbox("tool1", "tool2", val);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it("sandbox를 인자로 위젯 함수를 실행한다", function () {
        var widgetFcn = jasmine.createSpy();
        var sandbox = new Conference.WidgetSandbox("tool1", "tool2", widgetFcn);
        expect(widgetFcn).toHaveBeenCalledWith(sandbox);
      });
    });
  });
});
```

예제 11-3을 보면 `WidgetSandbox` 생성자 함수에 넘긴 도구명이 "배열"일 경우와 "개별 인자"일 경우, 모두를 테스트하고자 describe 블록을 2개 더 추가했다. 실행 결과 테스트는 실패한다.

<br/>

###### 예제 11-4 위젯 함수를 마지막으로 받는 `WidgetSandbox`

테스트를 실행하려면 위젯 함수는 반드시 `WidgetSandbox`생성자 함수의 마지막 인자로 전달해야 한다.

```javascript
Conference.WidgetTools.toolA = function (sandbox) {
  "use strict";

  // Conference.WidgetSandbox(...)를 new로 실행했는지 보장한다.
  if (!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  /* new code */
  var widgetFunction = arguments[arguments.length - 1];

  if (typeof widgetFunction !== "function") {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  widgetFunction(this);
};

/* new code */
// 빈 도구 이름공간을 생성한다.
Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew: "WidgetSandbox 함수는 반드시 new로 호출해야 합니다",
  fcnMustBeProvided: "위젯 함수는 필수 입력 항목입니다",
};
```

단위 테스트는 모두 성공이다.

<br/>

다음 단계는 `WidgetSandbox` 생성자 함수에 전달한 도구명에서 도구 모듈 함수를 찾아 도구 인스턴스를 생성하는 일이다.

```javascript
describe("Conference.WidgetSandbox", function () {
  "use strict";

  describe("생성자 함수", function () {
    var widgetFcnSpy;

    beforeEach(function () {
      // 테스트가 실제 도구에 구애받지 않게
      // 테스트 도구를 추가한다.
      Conference.WidgetTools.tool1 = function (sandbox) {
        return {};
      };
      Conference.WidgetTools.tool2 = function (sandbox) {
        return {};
      };

      // 위젯 함수 역할을 대신할 스파이를 만든다.
      widgetFcnSpy = jasmine.createSpy();
    });

    afterEach(function () {
      // 테스트 도구를 삭제한다.
      delete Conference.WidgetTools.too1;
      delete Conference.WidgetTools.too2;
    });

    /** 이전 테스트 줄임 **/

    describe("new WidgetSandbox(toolsArray, widgetFcn", function () {
      // 도구 목록을 배열 형태로 넘겼을 때 작동 여부를 테스트

      /** 이전 테스트 줄임 **/

      it("올바르지 않은 도구를 지정하면 예외를 던진다", function () {
        var badTool = "badTool";
        expect(function shouldThrow() {
          var sandbox = new Conference.WidgetSandbox(["tool1", badTool], widgetFcnSpy);
        }).toThrowError(Conference.WidgetSandbox.messages.unknownTool + badTool);
      });

      it("도구 모듈 함수를 sandbox에서 실행한다", function () {
        spyOn(Conference.WidgetTools, "tool1");
        spyOn(Conference.WidgetTools, "tool2");

        var sandbox = new Conference.WidgetSandbox(["tool1", "tool2"], widgetFcnSpy);

        expect(Conference.WidgetTools.tool1).goHaveBeenCalledWith(sandbox);
        expect(Conference.WidgetTools.tool2).goHaveBeenCalledWith(sandbox);
      });

      describe("new WidgetSandbox('tool1', ..., 'toolN', widgetFcn)", function () {
        /** 이전 테스트 줄임 **/
      });
    });
  });
});
```

이 단위 테스트는 실패한다. `WidgetSandbox`를 수정하면 단위 테스트는 성공한다.

###### 예제 11-6

```javascript
Conference.WidgetTools.toolA = function (sandbox) {
  "use strict";

  // Conference.WidgetSandbox(...)를 new로 실행했는지 보장한다.
  if (!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  var widgetFunction = arguments[arguments.length - 1];

  /* new code */
  var toolsToLoad = [];

  if (typeof widgetFunction !== "function") {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  /* new code */
  if (arguments[0] instanceof Array) {
    toolsToLoad = arguments[0];
  }

  toolsToLoad.forEach(function loadTool(toolName) {
    if (!Conference.WidgetTools.hasOwnProperty(toolName)) {
      throw new Error((Conference.WidgetSandbox.messages.unknownTool = toolName));
    }

    Conference.WidgetTools[toolName](this);
  }, this); // 콜백 내에서 this가 sandbox 인스턴스를 가리키도록 보장한다.

  widgetFunction(this);
};

// 빈 도구 이름공간을 생성한다.
Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew: "WidgetSandbox 함수는 반드시 new로 호출해야 합니다",
  fcnMustBeProvided: "위젯 함수는 필수 입력 항목입니다",
  unknownTool: "알 수 없는 도구입니다",
};
```

생성자 함수의 첫 번째 인자가 "배열"이면 지역 변수 `toolsToLoad`에 할당하고, 이어서 `Conference.WidgetTools` 이름공간에 `toolsToLoad` 배열에 있는 `toolName`과 이름이 같은 프로퍼티가 있는지 조사하여 그 유효성을 검증한다. `toolName`이 올바르지 않다면 즉시 에러를 내고, 올바르면 도구 모듈 함수에 샌드박스 인스턴스를 인자로 보내 실행한다.

다시 테스트하면 성공한다.

<br/>

###### 예제 11-7 개별 인자로 넘긴 도구명 목록에서 도구를 잘 찾는지 테스트

```javascript
describe("Conference.WidgetSandbox", function () {
  "usee strict";

  describe("생성자 함수", function () {
    var widgetFcnSpy;

    /** 이전 beforeEach/afterEach 블록은 줄임 **/

    /** 이전 테스트 줄임 **/

    describe("new WidgetSandbox(toolsArray, widgetFcn)", function () {
      // 도구 목록을 배열 형태로 넘겼을 때 작동 여부를 테스트
      /** 이전 테스트 줄임 **/
    });

    describe("new WidgetSandbox('tool1', ..., 'toolN', widgetFcn)", function () {
      // 도구 목록을 개별 인자 형태로 넘겼을 때 작동 여부를 테스트

      /** 이전 테스트 줄임 **/

      it("올바르지 않은 도구를 지정하면 예외를 던진다", function () {
        var badTool = "badTool";
        expect(function shouldThrow() {
          var sandbox = new Conference.WidgetSandbod("tool1", badTool1, widgetFcnSpy);
        }).toThrowError(Conference.WidgetSandbox.messages.unknownTool + badTool);
      });

      it("도구 모듈 함수를 sandbox에서 실행한다", function () {
        spyOn(Conference.WidgetTools, "tool1");
        spyOn(Conference.WidgetTools, "tool2");

        var sandbox = new Conference.WidgetSandbox("tool1", "tool2", widgetFcnSpy);

        expect(Conference.WidgetTools.tool1).goHaveBeenCalledWith(sandbox);
        expect(Conference.WidgetTools.tool2).goHaveBeenCalledWith(sandbox);
      });
    });
  });
});
```

###### 예제 11-8 개별 인자로 넘긴 도구명 목록에서 도구를 찾아 탑재하는 WidgetSandbox 생성자 함수

```javascript
Conference.WidgetTools.toolA = function (sandbox) {
  "use strict";

  // Conference.WidgetSandbox(...)를 new로 실행했는지 보장한다.
  if (!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  var widgetFunction,
    toolsToLoad = [],
    argsArray;

  // arguments에서 *진짜* 배열을 추출한다
  argsArray = Array.prototype.slice.call(arguments);

  // 배열 마지막 원소는 widgetFunction일 것이다. 뽑아낸다.
  widgetFunction = argsArray.pop();

  if (typeof widgetFunction !== "function") {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  toolsToLoad = argsArray[0] instanceof Array ? argsArray[0] : argsArray;

  toolsToLoad.forEach(function loadTool(toolName) {
    if (!Conference.WidgetTools.hasOwnProperty(toolName)) {
      throw new Error((Conference.WidgetSandbox.messages.unknownTool = toolName));
    }

    Conference.WidgetTools[toolName](this);
  }, this); // 콜백 내에서 this가 sandbox 인스턴스를 가리키도록 보장한다.

  widgetFunction(this);
};

// 빈 도구 이름공간을 생성한다.
Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew: "WidgetSandbox 함수는 반드시 new로 호출해야 합니다",
  fcnMustBeProvided: "위젯 함수는 필수 입력 항목입니다",
  unknownTool: "알 수 없는 도구입니다",
};
```

예제 11-8 처럼 `WidgetSandbox` 생성자 함수를 고치면 개별 인자로 도구명을 넘겨도 문제없이 처리할 수 있다.

먼저, 특별한 변수 `arguments`에서 `argsArray` 배열을 잘라 만든다. 위젯 함수를 가리키는 변수 `widgetFunction`은 `arguments`를 인덱싱하지 않고 `argsArray` 끝에서 튀어나오게 하는 식으로 할당한다.

<br/>

#### [Note] 특별한 변수 arguments

특별한 변수 arguments 는 모든 자바스크립트 함수에서 사용할 수 있으며, 함수에 전달된 인자를 인덱스로 참조할 수 있다. 인덱스로 원소를 참조하고 length 프로퍼티가 있어서 배열처럼 생겼지만 Array 객체는 아니다. 하지만 Array.prototype.slice 메서드 덕분에 거의 모든 유사 배열 객체에서 Array를 만들 수 있다.

<br/>

## 11.1.2 샌드박스 도구 생성과 테스팅

`WidgetSandbox` 자체는 사실 별로 효용성이 없다. 위젯 인스턴스는 깨끗하게 떼어 놓았지만, 위젯들이 뭔가 일을 하는 데 필요한 도구가 전혀 없다.

참가자 등록 처리를 관장하는 `attendeeWebApi`객체는 이미 만들어진 상태인데, 그 중 `getAll()` 메서드는 `attendee` 객체의 배열로 귀결하는 프라미스를 반환한다. `attendeeNames`라는 도구를 만들어서 `attendeeWebApi`의 퍼사드로 삼아 필요한 기능을 표시하기로 한다.

<br/>

###### 예제 11-9 Conference.WidgetTools.attendeeNames 의 단위 테스트

```javascript
describe("Conference.WidgetTools.attendeeNames", function () {
  "use strict";

  var attendeeWebApi, sandbox;

  beforeEach(function () {
    attendeeWebApi = Conference.attendeeWebApi();

    // POST 메서드는 호출되면 안된다.
    // 그래도 혹시 모르니 스파이를 심어두어 확인한다.
    spyOn(attendeeWebApi, "post");

    // attendeeNames를 단위 테스트하고자 sandbox는 빈 객체로 지정한다.
    sandbox = {};
  });

  afterEach(function () {
    // 테스트할 때마다 post가 호출되지 않았는지 확인한다.
    expect(attendeeWebApi.post).not.toHaveBeenCalled();
  });

  it("주어진 sandbox 객체에 자신을 추가한다", function () {
    Conference.WidgetTools.attendeeNames(sandbox, attendeeWebApi);
    expect(sandbox.attendeeNames).not.toBeUndefined();
  });

  describe("attendeeNames.getAll()", function () {
    var attendees, attendeeNames;

    beforeEach(function () {
      Conference.WidgetTools.attendeeNames(sandbox, attendeeWebApi);

      // 테스트 참가자 배열을 채워넣는다.
      attendees = [
        Conference.attendee("Tom", "Kazansky"),
        Conference.attendee("Pete", "Mitchell"),
        Conference.attendee("Mary", "Metcalf"),
      ];

      // 테스트 참가자 배열에서 이름을 추출한다.
      attendeeNames = [];

      attendees.forEach(function getNames(attendee) {
        attendeeNames.push(attendee.getFullName());
      });
    });

    it("참가자가 없을 경우 빈 배열로 귀결한다", function (done) {
      spyOn(attendeeWebApi, "getAll").and.returnValue(
        new Promise(function (resolve, reject) {
          resolve([]);
        })
      );

      sandbox.attendeeNames.getAll().then(
        function resolved(names) {
          expect(names).toEqual([]);
          done();
        },
        function rejected(reason) {
          expect("Failed").toBe(false);
          done();
        }
      );
    });

    it("참가자가 있을 경우 해당 이름으로 귀결한다", function (done) {
      spyOn(attendeeWebApi, "getAll").and.returnValue(
        new Promise(function (resolve, reject) {
          resolve(attendees);
        })
      );

      sandbox.attendeeNames.getAll().then(
        function resolved(names) {
          expect(names).toEqual(attendeeNames);
          done();
        },
        function rejected(reason) {
          expect("Failed").toBe(false);
          done();
        }
      );
    });

    it("어떤 사유로 인해 버려진다", function (done) {
      var rejectionReason = "버림받은 이유";

      spyOn(attendeeWebApi, "getAll").and.returnValue(
        new Promise(function (resolve, reject) {
          reject(rejectionReason);
        })
      );
      sandbox.attendeeNames.getAll().then(
        function resolved(names) {
          expect("Resolved").toBe(false);
          done();
        },
        function rejected(reason) {
          expect(reason).toBe(rejectionReason);
          done();
        }
      );
    });
  });
});
```

###### 예제 11-10

```javascript
var Conference = Conference || {};
Conference.WidgetTools = Conference.WidgetTools || {};

Conference.WidgetTools.attendeeNames = function (sandbox, injectedAttendeeWebApi) {
  "use strict";

  // attendeeWebApi를 선택적으로 주입할 수 있게 코딩한다. 단위 테스트할 때 유용하다.
  var attendeeWebApi = injectedAttendeeWebApi || Conference.attendeeWebApi();

  sandbox.attendeeNames = {
    // 참가자 이름 배열로 귀결하는 프라미스를 반환한다.
    getAll: function getAll() {
      return attendeeWebApi.getAll().then(function extractNames(attendees) {
        // 각 참가자의 전체 성명만 추출하여 반환한다.
        var names = [];
        attendees.forEach(function addName(attendee) {
          names.push(attendee.getFullName());
        });
        return names;
      });
    },
  };
};
```

`attendeeWebApi.getAll()`가 반환한 프라미스가 `attendeeNames.getAll()` 메서드를 통해 제대로 흘러가는지 체크하면 된다. 또한, `attendeeNames.getAll()`이 각 `attendee` 객체의 전부가 아닌, 참가자 성명만 추출해서 적절히 반환했는지 검사한다.

각 테스트 직후 빼먹으면 안될 중요한 검증 작업이 하나 더 있다. `attendeeWebApi.post(attendee)`를 호출한 적이 없는지 밝히는 것이다. 샌드박스의 컴포넌트에서 사용 가능한 기능을 고수준에서 다스릴 수 있다는 점이 샌드박스 패턴의 자랑이다. 예제에서는 `attendeeNames` 도구를 사용하는 위젯은 절대로 post 메서드를 실행할 수 없다. 다시 말해, 도구를 사용하는 위젯의 금기 사항이므로 `attendeeNames` 도구가 자체적으로 드러내지 않는 것이다.

<br/>

## 11.1.3 샌드박스에서 쓸 함수 만들기

샌드박스 패턴에서는 분리한 모듈은 오직 샌드박스 인스턴스에만 의존하며 이 인스턴스는 반드시 모듈에 주입하도록 명시되어 있다.

##### [Note]

샌드박스로 분리한 모듈은 애오라지 샌드박스하고만 통해야 한다. 샌드박스는 만들면 안될 객체 인스턴스를 만들지 못하게 막거나, window나 jQuery 같은 전역 객체에 계속 접근하게 놔둘 방법이 없다. 그렇게 허용하면 이 패턴의 취지와 정면으로 배치되고, 극구 피해야 할 의존성을 불러오는 결과를 가져온다.

승현이 개발한 `attendeeNames`와 샬럿이 작성한 `dom` 두 도구를 합하면 비로소 참가자 성명을 보여주는 위젯이 완성된다.

###### 예제 11-11 attendeeNamesWidget의 샌드박스 패턴 합류를 테스트

```javascript
describe("Conference.Widgets.attendeeNamesWidget(sandbox)", function () {
  "use strict";

  var sandbox;

  beforeEach(function () {
    sandbox = {};
  });

  it("dom 도구를 사용할 수 없는 경우 에러를 던진다", function () {
    expect(function shouldThrow() {
      Conference.Widgets.attendeeNamesWidget(sandbox);
    }).toThrowError(Conference.Widgets.messages.missingTool + "dom");
  });

  it("attendeeNames 도구를 사용할 수 없는 경우 에러를 던진다", function () {
    expect(function shouldThrow() {
      sandbox.dom = {};
      Conference.Widgets.attendeeNamesWidget(sandbox);
    }).toThrowError(Conference.Widgets.messages.missingTool + "attendeeNames");
  });

  // attendeeNamesWidget이 제대로 작동하는지 확인하는 다른 테스트
});
```

###### 예제 11-12 attendeeNamesWidget 구현부의 뼈대

```javascript
var Conference = Conference || {};
Conference.Widgets = Conference.Widgets || {};

Conference.Widgets.attendeeNamesWidget = function (sandbox) {
  "use strict";

  // 해당 도구를 사용할 수 없으면 즉시 실패 처리한다.
  if (!sandbox.dom) {
    throw new Error(Conference.Widgets.messages.missingTool + "dom");
  }
  if (!sandbox.attendeeNames) {
    throw new Error(Conference.Widgets.messages.missingTool + "attendeeNames");
  }

  // attendeeNames를 조회하여 대시보드에 추가한다.
  sandbox.attendeeNames.getAll().then(
    function resolved(names) {
      // sandbox.dom 으로 이름 목록을 표시한다.
    },
    function rejected(reason) {
      // sandbox.dom 으로 위젯 대신 에러 메세지를 나타낸다.
    }
  );
};

Conference.Widgets.messages = {
  missingTool: "누락된 도구: ",
};
```

<br/>

## 정리하기

샌드박스 패턴는 모듈 간 결합도를 낮추고 의존성을 엄격하게 다스리는 기법이다.
샌드박스 패턴을 구현한 코드는 단위 테스트로 다음 항목을 꼭 확인해야 한다.

- 샌드박스 생성자 함수에 위젯 모듈 함수를 전달한다.
- 도구는 샌드박스 생성자 함수에 배열 또는 개별 인자 형태로 넘긴다.
- 샌드박스에서 사용하기로 지정한 도구가 유효하다.
- 샌드박스 안에서 실행할 위젯이 요청한 도구는 샌드박스가 제공한다.

<br/>

### fin.
