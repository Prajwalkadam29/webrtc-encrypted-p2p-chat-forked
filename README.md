# webrtc-encrypted-p2p-chat
-----

# SecureChat: Web3-Authenticated E2E Encrypted P2P Chat

This project is a decentralized, peer-to-peer (P2P) chat application featuring end-to-end encryption (E2E) and Web3-based authentication using "Sign-In with Ethereum" (SIWE).

Your conversations are never stored on a central server. Messages are encrypted on your device and decrypted only on the recipient's device. Authentication is handled by your Ethereum wallet (like MetaMask), proving ownership without requiring a password.

## Features

  * **🔒 End-to-End Encryption:** All messages and files are encrypted using **AES-GCM-256**. Keys are established via an **ECDH (P-256)** key exchange for perfect forward secrecy.
  * **🌐 Peer-to-Peer Communication:** Uses **WebRTC** to create a direct mesh network between users in a room. The server is only used for signaling (helping peers find each other) and does not have access to any message content.
  * **🛡️ Web3 Authentication:** Securely log in using your Ethereum wallet via the **Sign-In with Ethereum (SIWE)** standard. No passwords, no email addresses.
  * **📁 Secure File Sharing:** Transfer files directly to peers, with chunked sending and **SHA-256** hash verification to ensure file integrity.
  * **💅 Rich Chat UI:** Includes features like emoji reactions, message pinning, real-time connection status, and sound notifications, built with React and Framer Motion.
  * **✨ Animated Background:** Features a dynamic 'Vanta.js' network animation on the landing page.

## Tech Stack

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Client** | React, Vite | Frontend UI and development environment |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Animation** | Framer Motion | UI animations and transitions |
| **Web3** | Ethers.js, SIWE | Wallet connection and authentication |
| **P2P** | WebRTC | Direct peer-to-peer data channels |
| **Encryption**| Web Crypto API | AES-GCM (encryption) & ECDH (key exchange) |
| **Server** | Node.js, `ws` (WebSocket) | Signaling server for WebRTC handshakes |
| **HTTPS** | `mkcert` (local) | Required for WebRTC and Web Crypto APIs |

## Architecture diagram

```
  [ Client A ]                                       [ Client B ]
      |                                                  |
      | 1. Join Room (WSS)                               | 1. Join Room (WSS)
      |                                                  |
      '-------------------> [ Signaling Server ] <-------'
                           (WebSocket @ port 3001)
      |                                                  |
      | 2. Server sends Client B's info to A             |
      |                                                  |
      '------------------ [ Signaling Server ]           |
                                    |                  |
      |                             | 3. Server sends  |
      |                             |    Client A's info |
      |                             |    to B            |
      |                             '------------------> |
      |                                                  |
      | 4. Send WebRTC Offer (via Signaling Server)      |
      '-------------------> [ Signaling Server ] -------'
                                    | 5. Forward Offer
                                    '------------------> |
      |                                                  |
      | 7. Forward Answer           | 6. Send WebRTC Answer (via Signaling Server)
      '------------------- [ Signaling Server ] <-------'
      |                                                  |
      |                                                  |
      |<---------- 8. Direct P2P Connection ---------->|
      |                 (WebRTC Data Channel)            |
      |                                                  |
      |<---------- 9. E2E Key Exchange (ECDH) --------->|
      |                                                  |
      |<---------- 10. Encrypted Chat (AES-GCM) ------->|
      |                                                  |
```
      

## Setup and Installation

This project requires both a client and a server to be running. Because WebRTC and the Web Crypto API **require a secure context**, you **must** run both servers over HTTPS, even locally.

The easiest way to do this is by generating a trusted local SSL certificate.

### Prerequisites

  * [Node.js](https://nodejs.org/en/) (v18 or higher)
  * A package manager (npm, pnpm, or yarn)
  * [mkcert](https://github.com/FiloSottile/mkcert) (for generating local SSL certs)
  * A Web3 wallet extension, like [MetaMask](https://metamask.io/)

-----

### Step 1: Generate Local SSL Certificates

You only need to do this once. We will use `mkcert` to create certificate files that your computer will trust.

1.  **Install `mkcert`**. (Follow its installation guide. On macOS, it's `brew install mkcert`).

2.  **Install the `mkcert` local certificate authority**:

    ```sh
    mkcert -install
    ```

    You may need to enter your password. This makes your browser trust certificates generated by `mkcert`.

3.  **Generate the certificate files**:
    In a terminal, navigate to a safe place (like the root of this project folder) and run:

    ```sh
    mkcert localhost 127.0.0.1 ::1
    ```

    This will create two files in your current directory:

      * `localhost.pem` (the certificate)
      * `localhost-key.pem` (the private key)

    You will now copy these two files into *both* the `server` and `client` directories.

-----

### Step 2: Set Up the Signaling Server

The server handles WebSocket connections to help peers find and connect to each other.

1.  **Navigate to the server directory**:

    ```sh
    cd server
    ```

2.  **Install dependencies**:

    ```sh
    npm install
    ```

3.  **Add SSL Certificates**:
    Copy the `localhost.pem` and `localhost-key.pem` files you created in Step 1 into this `/server` directory.

4.  **Start the server**:

    ```sh
    npm run dev
    ```

    The server will start (using `nodemon`) and log that it's running on port `3001`:

    ```
    🚀 WebSocket Server Running (HTTPS):
       ➜  Local:   https://localhost:3001
       ➜  Network: https://[YOUR_IP_ADDRESS]:3001
    ✅ Server ready for connections
    ```

    Keep this terminal running.

-----

### Step 3: Set Up the Client (React App)

The client is the React application you will interact with in your browser.

1.  **Open a new terminal** and navigate to the client directory:

    ```sh
    cd client
    ```

2.  **Install dependencies**:

    ```sh
    npm install
    ```

3.  **Add SSL Certificates**:
    Copy the *same* `localhost.pem` and `localhost-key.pem` files from Step 1 into this `/client` directory. (Vite is configured to look for them here).

4.  **Start the client**:

    ```sh
    npm run dev
    ```

    Vite will start the development server, typically on port `5173`:

    ```
      VITE v5.x.x  ready in xxx ms

      ➜  Local:   https://localhost:5173/
      ➜  Network: https://[YOUR_IP_ADDRESS]:5173/
    ```

    Keep this terminal running as well.

-----

## How to Use the Application

1.  **Access the App**:
    Open your browser (e.g., Chrome, Firefox) and go to the client's "Local" URL: **`https://localhost:5173`**.

2.  **Browser Warning**:
    Your browser will show a security warning like "Your connection is not private" (NET::ERR\_CERT\_AUTHORITY\_INVALID). This is expected because the certificate is self-signed (even though we told our OS to trust it with `mkcert -install`).

      * Click **"Advanced"**.
      * Click **"Proceed to localhost (unsafe)"**.

3.  **Connect Your Wallet**:

      * You will see the landing page. Click **"Get Started"** or **"Connect Wallet"**.
      * The Wallet Login modal will appear.
      * Click "Connect Wallet" and approve the connection in your MetaMask extension.

4.  **Sign In**:

      * Once connected, the modal will ask you to **"Sign Message"**.
      * This uses the SIWE standard to prove you own the wallet. This is a **free** action and does not cost any gas.
      * Click "Sign" in the MetaMask pop-up.

5.  **Start Chatting**:

      * You will be prompted to enter a **Display Name**.
      * After joining, you will be in the `#general` room.
      * **To test the chat**, you must have another peer join. Open a second browser window (or another browser) and go to `https://localhost:5173` again. Repeat steps 2-5 with a *different wallet address* or the *same wallet* (for testing) and a different display name.

    Once the second user joins, the P2P connection will be established, the "E2E" badge will appear, and you can send encrypted messages directly between the two browser windows.
