-- 이 파일의 내용을 모두 복사하세요 (Ctrl+A, Ctrl+C)

-- 1. RLS(행 수준 보안) 활성화
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 2. 기존 정책이 있다면 삭제 (충돌 방지)
DROP POLICY IF EXISTS "Allow public access" ON todos;
DROP POLICY IF EXISTS "Anyone can view todos" ON todos;
DROP POLICY IF EXISTS "Anyone can create todos" ON todos;
DROP POLICY IF EXISTS "Anyone can update todos" ON todos;
DROP POLICY IF EXISTS "Anyone can delete todos" ON todos;

-- 3. 누구나 읽고/쓰고/수정하고/삭제할 수 있는 통합 정책 생성
CREATE POLICY "Allow public access" ON todos
FOR ALL
USING (true)
WITH CHECK (true);

-- 이제 Supabase 대시보드의 SQL Editor에 붙여넣고 Run 버튼을 누르세요.
