// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // 이 설정 파일(eslint.config.mjs) 자체는 린트 검사에서 제외합니다.
    ignores: ['eslint.config.mjs'],
  },
  // ESLint에서 권장하는 기본 자바스크립트 규칙 세트를 적용합니다.
  eslint.configs.recommended,
  // 타입 정보를 활용하는 TypeScript 권장 규칙 세트를 적용합니다 (엄격한 검사).
  ...tseslint.configs.recommendedTypeChecked,
  // Prettier와 충돌하는 ESLint 규칙을 끄고, 포맷팅 위반을 ESLint 에러로 표시합니다.
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        // Node.js 환경(process 등)과 Jest 테스트 환경(describe, it 등)의 전역 변수를 인식시킵니다.
        ...globals.node,
        ...globals.jest,
      },
      // 소스 코드를 CommonJS 모듈 시스템(require/exports)으로 해석하도록 설정합니다.
      sourceType: 'commonjs',
      parserOptions: {
        // 가장 가까운 tsconfig.json을 자동으로 찾아 타입 린팅 서비스를 활성화합니다 (성능 최적화).
        projectService: true,
        // tsconfig.json 파일을 찾을 때 현재 파일 위치를 루트 경로로 사용합니다.
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // 쓸데없는 빨간줄 제거
      'prettier/prettier': 'off',
      // 'any' 타입 사용을 금지하는 규칙을 끕니다 (any 사용 허용).
      '@typescript-eslint/no-explicit-any': 'error',
      // 비동기 함수(Promise)를 호출하고 await나 처리를 안 했을 때 경고를 띄웁니다.
      '@typescript-eslint/no-floating-promises': 'warn',
      // 'any' 타입인 값을 함수 인자로 넘길 때 경고를 띄웁니다 (타입 안전성 경고).
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
);
