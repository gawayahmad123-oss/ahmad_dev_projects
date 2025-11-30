
# Ahmad Dev Project / مشروع أحمد للتطوير

## 🚀 نبذة / Overview  
**EN:**  
This repository contains a full web-app project including backend API, database setup, CI/CD, and monitoring tools — ready for development, testing, and deployment.  

**AR:**  
يحتوي هذا المستودع على مشروع ويب متكامل يشمل خادم API، قاعدة بيانات، إعداد CI/CD، وأدوات مراقبة — جاهز للتطوير والاختبار والنشر.

---

## 🧰 التقنيات المستخدمة / Tech Stack  
- **Backend:** Node.js + Express  
- **Database:** PostgreSQL (Dockerized)  
- **Containerization:** Docker & Docker Compose  
- **CI/CD:** GitHub Actions (build → test → build/push image → deploy)  
- **Monitoring:** Prometheus + Grafana  
- **Testing:** Jest + Supertest  

---

## 📦 كيفية التشغيل محليًا / Local Setup  

```bash
# نسخ المستودع
git clone https://github.com/USERNAME/ahmad_dev_projects.git
cd ahmad_dev_projects

# تشغيل التطبيق (يتطلب Docker + Docker Compose)
docker-compose up --build

التطبيق سيكون متاحًا على: http://localhost:3000

لوحة المراقبة (Grafana) على: http://localhost:3001

نقطة الصحة (health): GET /health

API المستخدمين: GET /api/users, POST /api/users



---

✅ CI/CD & Deployment

عند كل تحديث على main/master → GitHub Actions تقوم تلقائيًا بـ build + test + بناء صورة Docker + نشر إلى خادم Test (إذا تم إعداد الأسرار Secrets).

استخدم الإصدارات (Git Tags) لإدارة الإصدارات والرجوع إلى نسخة سابقة بسهولة.



---

🔧 إن أردت المساهمة / Contribution Guideline

1. افتح Issue لوصف التعديل.


2. أنشئ Branch جديد (feature/your-feature).


3. نفّذ التعديلات + اختبارات (إن لزم).


4. أرسل Pull Request وسأراجع وأدمج إن كان كل شيء صحيحًا.




---

📄 الترخيص / License

هذا المشروع مرخّص تحت ترخيص MIT — يمكنك استخدامه بحرية مع ذكر الأصل.


---

📝 ملاحظات / Notes

تأكد من إعداد متغيرات البيئة (إذا أضفت .env) قبل التشغيل.

يُفضّل تشغيل Docker Compose عبر بيئة تدعم docker و docker-compose.

لو أردت نشر التطبيق في بيئة إنتاج (Production) — يُنصح بضبط إعدادات الأمان، SSL، والحاويات المناسبة.


---
