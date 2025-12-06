export default function DownloadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Télécharger Calcul
        </h1>
        
        <p className="text-gray-600 mb-8 text-center">
          Application de bureau pour la conversion de lettres en majuscules ou minuscules
        </p>

        <div className="space-y-4">
          {/* Windows MSI Installer */}
          <a
            href="https://github.com/mrabetmotia/calcul/releases/latest/download/calcul_0.1.0_x64_en-US.msi"
            className="flex items-center justify-between p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border-2 border-blue-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Windows (MSI)
              </h3>
              <p className="text-sm text-gray-600">
                Programme d'installation Windows
              </p>
            </div>
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>

          {/* Windows NSIS Installer */}
          <a
            href="https://github.com/mrabetmotia/calcul/releases/latest/download/calcul_0.1.0_x64-setup.exe"
            className="flex items-center justify-between p-6 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border-2 border-green-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Windows (EXE)
              </h3>
              <p className="text-sm text-gray-600">
                Installation rapide Windows
              </p>
            </div>
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Instructions d'installation :</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Téléchargez l'installateur pour votre système</li>
            <li>Exécutez le fichier téléchargé</li>
            <li>Suivez les instructions d'installation</li>
            <li>Lancez l'application depuis votre menu Démarrer</li>
          </ol>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Retour au site web
          </a>
        </div>
      </div>
    </div>
  );
}
