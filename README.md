# web-app-devtest-stack

مستودع نموذجي لإعداد بيئة تطوير متكاملة (Dev + Test) لمشروع ويب صغير، يتضمن:
- خادم تطبيق (Node.js + Express)
- قاعدة بيانات PostgreSQL (Docker)
- واجهة API بسيطة لإدارة المستخدمين (`/api/users`)
- CI/CD عبر GitHub Actions: build, tests, push Docker image، ونشر عبر SSH إلى خادم Test
- Monitoring: Prometheus + Grafana
- Versioning: git + Git tags

---

## بنية المشروع
- `src/` : كود التطبيق
- `tests/` : اختبارات Jest
- `Dockerfile` : صورة الحاوية
- `docker-compose.yml` : لتشغيل App + Postgres + Prometheus + Grafana محليًا
- `.github/workflows/ci.yml` : إعداد GitHub Actions
- `monitoring/prometheus.yml` : إعداد Prometheus
- `.env.example` : متغيرات بيئة

---

## تشغيل محلي (بدون GitHub)

1. تأكد أن لديك Docker و Docker Compose مثبتين.
2. انسخ الملف `.env.example` إلى `.env` واضبط المتغيرات إن احتجت:
   ```bash
   cp .env.example .env
   ```
3. شغّل:
   ```bash
   docker-compose up --build
   ```
4. افتح:
   - تطبيق الويب: http://localhost:3000
   - Grafana: http://localhost:3001 (Default admin/admin) — قد تحتاج لتكوين datasource يدويًا: استخدم Prometheus على http://prometheus:9090 (داخل الشبكة) أو http://localhost:9090 من الجهاز المضيف.
   - Prometheus: http://localhost:9090

### نقاط النهاية المهمة
- Health: `GET /health`
- Users API:
  - `POST /api/users`  — body JSON: `{ "email": "...", "name": "..." }`
  - `GET /api/users`

---

## تشغيل الاختبارات محليًا
```bash
npm ci
# استخدم متغير بيئة للإشارة إلى قاعدة بيانات اختبارية
export DATABASE_URL=postgres://postgres:postgres@localhost:5432/appdb
npm test
```

---

## CI/CD (GitHub Actions)
هناك ثلاث مهام رئيسية في `.github/workflows/ci.yml`:
1. **build-and-test**: يُشغّل اختبارات الوحدة على runner مع خدمة Postgres.
2. **docker-build-and-push**: يبني صورة Docker ويدفعها إلى Docker Hub (يحتاج إعداد الأسرار `DOCKERHUB_USER` و`DOCKERHUB_TOKEN`).
3. **deploy-to-test**: مثال نشر عبر SSH إلى خادم Test. يحتاج الأسرار: `TEST_HOST`, `TEST_USER`, `TEST_SSH_KEY`, ووجود ملف بيئة على الخادم.

### إعداد الأسرار في GitHub
في إعدادات المستودع -> Secrets and variables -> Actions، أضف:
- `DOCKERHUB_USER`
- `DOCKERHUB_TOKEN`
- `TEST_HOST`
- `TEST_USER`
- `TEST_SSH_KEY` (المفتاح الخاص لوصول SSH)

---

## Monitoring & Logging
- التطبيق يعرض `/metrics` بتنسيق Prometheus.
- Prometheus مُعدّ في `monitoring/prometheus.yml` لقراءة التطبيق.
- Grafana مثبت في docker-compose — قم بإضافة Data Source: Prometheus `http://prometheus:9090` (داخل الشبكة) أو `http://host.docker.internal:9090` إن لزم.

---

## Versioning و Rollback
نستخدم Git العادي مع Tags:
```bash
git tag -a v0.1.0 -m "Initial release"
git push origin v0.1.0
```
لإرجاع نسخة:
```bash
git checkout <tag_or_commit>
```

---

## نشر إلى GitHub (خطوات سريعة)
1. أنشئ مستودع جديد على GitHub (مثلاً `web-app-devtest-stack`).
2. ادف الملفات والمجلد `.git`:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<your-user>/web-app-devtest-stack.git
git push -u origin main
```
3. في Settings -> Actions -> Secrets أضف الأسرار المطلوبة (انظر أعلى).

---

## ملاحظات أمنية
- لا تضع أسرار في الملفات — استخدم GitHub Secrets أو Vault.
- مفتاح SSH يجب حمايته ولا ترفعه للمستودع.

---

## هل تريد أن أرفع هذا المستودع إلى GitHub نيابةً عنك؟
لا أمتلك صلاحيات للوصول إلى حساب GitHub الخاص بك. لكن جهزت لك مشروعًا جاهزًا للرفع: قم بتحميل الأرشيف الموجود أدناه، ثم اتبع خطوات "نشر إلى GitHub" أعلاه. إذا رغبت — أو أعطيتني رابطًا لمستودع فارغ أو تفاصيل الوصول الآمن — أستطيع إرشادك خطوة بخطوة لنشره.

