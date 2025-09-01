import { useState } from "react";

const SSOSignIn = () => {

    const [tenantId, setTenantId] = useState("");
    const startSSOSignIn = () => {
        if (!tenantId) {
            alert("Please enter a tenant ID");
            return;
        } else {
            const queryParams = new URLSearchParams({
                tenantId,
                redirectUrl: 'https://nice-pebble-0b9f9311e.1.azurestaticapps.net/authorization-code/callback',
            }).toString();
            fetch(`https://java104-amb4g2gpeneefmae.canadacentral-01.azurewebsites.net/start_sso?${queryParams}`, {
                headers: {
                    Accept: 'application/json',
                }
            }).then(async (response) => {
                const url = (await response.json()).url;
                console.log(url)
                window.location.href = url;
            }).catch((error) => {
                console.log(error)
                alert("Error starting SSO sign in.")
            });
        }
    }

    return <>
        <h1>Tenant SSO OIDC Sign In</h1>
        <input type="text" value={tenantId} placeholder="Tenant ID" onChange={(e) => setTenantId(e.target.value)} />
        <button onClick={startSSOSignIn}>Sign in via SSO</button>
    </>
}

export default SSOSignIn;
