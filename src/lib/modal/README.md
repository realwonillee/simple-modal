# Modal System

React 기반의 모달 시스템으로, Context API를 활용하여 구현되었습니다. 이 시스템은 모달을 간편하게 관리할 수 있는 기능을 제공합니다.

## 주요 구성 요소

### ModalContext.tsx

- `ModalContext`: React Context를 생성하여 모달 상태와 액션을 관리합니다.
- `ModalProvider`: Context Provider 컴포넌트로, 모달 상태를 관리하고 모달 액션 함수를 제공합니다.
- `useModalContext`: 모달 Context를 쉽게 사용할 수 있는 커스텀 훅입니다.

#### 주요 기능

- `open`: 새 모달을 열고 스택에 추가합니다.
- `replace`: 현재 모달을 새 모달로 교체하거나 모든 모달을 교체합니다.
- `close`: 최상위 모달을 닫습니다.
- `closeAll`: 모든 모달을 닫습니다.
- `isOpen`: 특정 모달의 열림 상태를 확인합니다.

### ModalService.ts

- 싱글톤 패턴으로 구현된 서비스 클래스입니다.
- 모달의 상태를 관리하고 이벤트를 처리합니다.

#### 주요 기능

- DOM 요소 생성 및 제거: 모달을 위한 DOM 요소를 동적으로 관리합니다.
- 키보드 이벤트 처리: ESC 키를 누르면 최상위 모달이 닫힙니다.
- 구독 패턴: 모달의 열림/닫힘 상태 변경을 구독하고 알림을 보냅니다.
- Body 스크롤 제어: 모달이 열려있을 때 body의 스크롤을 방지합니다.

### ModalPortal.tsx

- ReactDOM.createPortal을 사용하여 모달 컨텐츠를 특정 DOM 요소에 렌더링합니다.
- 모달 컴포넌트가 DOM 계층 구조 외부에 렌더링되도록 지원합니다.

## 사용 방법

이 모달 시스템은 React 애플리케이션에서 다음과 같이 사용할 수 있습니다:

1. 최상위 컴포넌트에 `ModalProvider`를 추가합니다.
2. 모달을 사용할 컴포넌트에서 `useModalContext`를 사용하여 모달 액션에 접근합니다.
3. `modalAction.open()`을 호출하여 모달을 표시합니다.

```jsx
// 모달 사용 예시
const { modalAction } = useModalContext();

// 모달 열기
const openMyModal = () => {
  modalAction.open(<MyModalComponent />);
};

// 모달 닫기
const closeModal = () => {
  modalAction.close();
};
```

이 모달 시스템은 여러 모달을 스택 형태로 관리할 수 있으며, ESC 키를 이용한 닫기 기능이 내장되어 있습니다.
