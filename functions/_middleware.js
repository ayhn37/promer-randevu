// Promer Admin Panel — Middleware
// Basic Auth devre dışı. Kimlik doğrulama Firebase Auth ile yapılıyor.
// İleride tekrar Basic Auth açmak istersen, aşağıdaki bloğu aktif edebilirsin.

export async function onRequest(context) {
  // Şu an hiçbir şey yapmıyor, sadece isteği geçiriyor.
  // Firebase Auth zaten /admin/* sayfasını koruyor.
  return context.next();
}

/* ============================================================
   İLERİDE BASIC AUTH'U TEKRAR AÇMAK İSTERSEN
   Yukarıdaki onRequest fonksiyonunu sil, aşağıdakini kullan:

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (!url.pathname.startsWith('/admin')) {
    return context.next();
  }

  const auth = context.request.headers.get('Authorization');

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

  const decoded = atob(encoded);
  const [username, password] = decoded.split(':');

  const VALID_USERNAME = context.env.ADMIN_USER;
  const VALID_PASSWORD = context.env.ADMIN_PASS;

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
============================================================ */
