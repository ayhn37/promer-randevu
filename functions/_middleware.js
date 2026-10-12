export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Sadece /admin ile başlayan sayfaları koru
  if (!url.pathname.startsWith('/admin')) {
    return context.next();
  }

  const auth = context.request.headers.get('Authorization');

  // Şifre girilmemişse tarayıcıya şifre penceresi göster
  if (!auth) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Promer Admin Panel"',
      },
    });
  }

  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic') {
    return new Response('Invalid authentication', { status: 401 });
  }

  // Kimlik bilgilerini çöz
  const decoded = atob(encoded);
  const [username, password] = decoded.split(':');

  // ⚠️⚠️⚠️ BURAYA KENDİ KULLANICI ADI VE ŞİFRENİZİ YAZIN ⚠️⚠️⚠️
  const VALID_USERNAME = 'promer';
  const VALID_PASSWORD = 'GucluSifre2026!';

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return new Response('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Promer Admin Panel"',
      },
    });
  }

  return context.next();
}
