# Security Information

## 🔒 Protected Files

The following files contain sensitive information and are **NOT committed to Git**:

### **Critical Files (NEVER COMMIT):**
- ✅ `backend/.env` - Contains MongoDB connection string with password
- ✅ `CREDENTIALS.txt` - Contains all your credentials
- ✅ `logs/*.log` - May contain sensitive runtime information
- ✅ `*.pid` - Process ID files

These files are listed in `.gitignore` and will not be uploaded to GitHub.

---

## 📝 What IS Safe to Commit:

✅ `backend/.env.example` - Template without actual credentials
✅ All source code files
✅ Configuration files
✅ Scripts (start.sh, stop.sh, etc.)
✅ README and documentation

---

## 🔐 Your Credentials Location:

**File:** `CREDENTIALS.txt` (local only, not in Git)

Contains:
- MongoDB Atlas email
- Database username
- Database password
- Connection string

---

## ⚠️ Before Pushing to GitHub:

**Always run this command first:**
```bash
./check-security.sh
```

This verifies that all sensitive files are protected.

---

## 🛡️ Security Best Practices:

1. **Never commit `.env` files** - They contain secrets
2. **Use `.env.example`** - Template for others to copy
3. **Rotate passwords** - If accidentally exposed, change immediately
4. **Use environment variables** - Don't hardcode secrets in code
5. **Check before commit** - Run `./check-security.sh`

---

## 🚨 If Credentials Are Exposed:

1. **Immediately change MongoDB password:**
   - Go to: https://cloud.mongodb.com/
   - Database Access → Edit User → Edit Password

2. **Update your local `.env` file** with new password

3. **Remove from Git history** (if committed):
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch backend/.env" \
     --prune-empty --tag-name-filter cat -- --all
   ```

4. **Force push** (careful!):
   ```bash
   git push --force --all
   ```

---

## ✅ Current Status:

Run `./check-security.sh` to verify all sensitive files are protected.

All systems are configured correctly! Your credentials are safe.