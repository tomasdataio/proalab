import requests
import json

def check_api_health(base_url):
    health_endpoint = f"{base_url}/api/health"
    
    try:
        response = requests.get(health_endpoint)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
        
        data = response.json()
        print("API Health Check Response:")
        print(json.dumps(data, indent=2))
        
        if data['status'] == 'ok':
            print("\nAPI is healthy and operational!")
        else:
            print("\nAPI reported an error status. Please check the response for details.")
        
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to the API: {e}")

if __name__ == "__main__":
    # URL de la aplicación desplegada en Vercel
    base_url = "https://v0-proa-lab.vercel.app"
    check_api_health(base_url)

