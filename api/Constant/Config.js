export const googleAuth = {
    "client_id": process.env.CLIENT_ID,
    "project_id": "tidal-tower-326714",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": process.env.CLIENT_SECRET
}

export const jwt_config = {
    secret_key: "my_servicenet_config_key",
    update_string: "i love servicenet_config"
};
