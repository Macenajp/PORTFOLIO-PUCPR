import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)


CORS(app)


OLLAMA_URL = "http://localhost:11434/api/generate"


@app.route("/api/processar", methods=["POST"])
def processar_texto():
    """
    Esta função é chamada toda vez que o JavaScript
    envia uma requisição para '/api/processar'.
    """
    try:
        dados_frontend = request.json
        prompt_usuario = dados_frontend.get("prompt")

        if not prompt_usuario:
            return jsonify({"erro": "Nenhum prompt fornecido"}), 400

        dados_ollama = {
            "model": "gemma3:4b",
            "prompt": prompt_usuario,
            "stream": False 
        }

        print(f"Enviando para o Ollama: {prompt_usuario}")
        response_ollama = requests.post(OLLAMA_URL, json=dados_ollama)
        response_ollama.raise_for_status() # Lança erro se a resposta não for 200

        print("Resposta recebida do Ollama.")
        return jsonify(response_ollama.json())

    except requests.exceptions.RequestException as e:
        print(f"Erro ao contatar o Ollama: {e}")
        return jsonify({"erro": f"Não foi possível conectar ao Ollama: {e}"}), 503
    except Exception as e:
        print(f"Erro inesperado: {e}")
        return jsonify({"erro": f"Um erro interno ocorreu: {e}"}), 500

if __name__ == "__main__":

    app.run(port=5000, debug=True)