# Modal 시스템 테스트

이 디렉토리에는 모달 시스템의 테스트 코드가 포함되어 있습니다.

## 테스트 파일 구조

- **ModalContext.test.tsx**: ModalContext 컴포넌트와 Hook의 기능을 테스트합니다.
- **ModalService.test.ts**: 모달 서비스 클래스의 싱글톤 패턴 및 주요 기능을 테스트합니다.
- **ModalPortal.test.tsx**: Portal을 통한 모달 렌더링을 테스트합니다.
- **setup.ts**: 테스트에 필요한 전역 타입 선언 및 설정을 포함합니다.

## 테스트 내용

### ModalContext 테스트

- `open()`: 새 모달을 열고 스택에 추가하는 기능
- `replace()`: 현재 모달을 새 모달로 교체하는 기능
- `close()`: 최상위 모달을 닫는 기능
- `closeAll()`: 모든 모달을 닫는 기능
- `isOpen()`: 모달의 열림 상태 확인 기능

### ModalService 테스트

- 싱글톤 패턴: 단일 인스턴스 확인
- 이벤트 처리: ESC 키 이벤트 처리
- DOM 조작: 모달 요소 생성 및 제거
- 구독 관리: 콜백 등록 및 해제

### ModalPortal 테스트

- Portal을 통한 렌더링: React Portal을 사용한 올바른 렌더링 확인
- 업데이트 처리: props 변경 시 올바른 리렌더링
- 중첩 컴포넌트 지원: 중첩된 컴포넌트 구조의 올바른 렌더링

## 테스트 실행 방법

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

```bash
# 모든 테스트 실행
npm test

# 특정 테스트 파일만 실행
npm test -- ModalContext
```

## 테스트 환경 설정

테스트를 실행하기 전에 필요한 패키지를 설치해야 합니다:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

TypeScript 사용 시 추가 패키지:

```bash
npm install --save-dev @types/jest ts-jest
```
