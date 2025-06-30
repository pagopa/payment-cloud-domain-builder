"use client";
import { useState } from "react";
import React from 'react';


type FormData = {
  domain_name: string;
  is_dev_public: boolean;
  storage_account_state_name: string;
  storage_account_container_state_name: string;
  subscription: string;
  log_analytics_ws_name: string;
  log_analytics_ws_rg_name: string;
  monitor_rg_name: string;
  monitor_action_group_slack_name: string;
  monitor_action_group_email_name: string;
  monitor_action_group_opsgenie_name: string;
  azdo_managed_identity_rg_name: string;
  azdo_managed_identity_iac_prefix: string;
  vnet_name: string;
  vnet_rg_name: string;
  product_name: string;
  location: string;
};

const defaultForm: FormData = {
  domain_name: "",
  is_dev_public: false,
  storage_account_state_name: "",
  storage_account_container_state_name: "",
  subscription: "",
  log_analytics_ws_name: "",
  log_analytics_ws_rg_name: "",
  monitor_rg_name: "",
  monitor_action_group_slack_name: "",
  monitor_action_group_email_name: "",
  monitor_action_group_opsgenie_name: "",
  azdo_managed_identity_rg_name: "",
  azdo_managed_identity_iac_prefix: "",
  vnet_name: "",
  vnet_rg_name: "",
  product_name: "",
  location: "",
};

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const step1 = (
    <div key={1}>
      <h2 className="text-2xl font-bold mb-2 text-indigo-400">Step 1: Dominio & Stato</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Nome dominio</label>
          <input
            type="text"
            name="domain_name"
            value={formData.domain_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_dev_public"
            checked={formData.is_dev_public}
            onChange={handleChange}
            className={`peer w-4 h-4 appearance-none border border-zinc-600 rounded bg-zinc-900 checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-500 transition-colors`}
            id="is_dev_public"
          />
          <label htmlFor="is_dev_public" className="text-zinc-300">
            Ambiente DEV pubblico?
          </label>
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Account Storage Name</label>
          <input
            type="text"
            name="storage_account_state_name"
            value={formData.storage_account_state_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. tfmemestgitnsala"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Storage Container Name
          </label>
          <input
            type="text"
            name="storage_account_container_state_name"
            value={formData.storage_account_container_state_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. tfstatesala"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Subscription
          </label>
          <input
            type="text"
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. DEV-PagoPA"
          />
        </div>
        <button
          type="button"
          onClick={() => setStep(2)}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded w-full mt-4"
        >
          Avanti
        </button>
      </div>
    </div>
  );

  const step2 = (
    <div key={2}>
      <h2 className="text-2xl font-bold mb-2 text-emerald-400">Step 2: Monitoraggio</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Log Analytics Workspace Name
          </label>
          <input
            type="text"
            name="log_analytics_ws_name"
            value={formData.log_analytics_ws_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-law"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Resource Group Workspace
          </label>
          <input
            type="text"
            name="log_analytics_ws_rg_name"
            value={formData.log_analytics_ws_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-monitor-rg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor RG Name
          </label>
          <input
            type="text"
            name="monitor_rg_name"
            value={formData.monitor_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-rg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor AG Slack Name
          </label>
          <input
            type="text"
            name="monitor_action_group_slack_name"
            value={formData.monitor_action_group_slack_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-action-group-slack"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor AG Email Name
          </label>
          <input
            type="text"
            name="monitor_action_group_email_name"
            value={formData.monitor_action_group_email_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-action-group-email"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor AG Opsgenie Name
          </label>
          <input
            type="text"
            name="monitor_action_group_opsgenie_name"
            value={formData.monitor_action_group_opsgenie_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-action-group-opsgenie"
          />
        </div>
        <div className="flex gap-4 mt-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="bg-zinc-700 hover:bg-zinc-600 transition text-zinc-200 px-4 py-2 rounded w-1/2"
          >
            Indietro
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-4 py-2 rounded w-1/2"
          >
            Avanti
          </button>
        </div>
      </div>
    </div>
  );

  const step3 = (
    <div key={3}>
      <h2 className="text-2xl font-bold mb-2 text-pink-400">Step 3: Networking & Altri</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">RG Managed Identity</label>
          <input
            type="text"
            name="azdo_managed_identity_rg_name"
            value={formData.azdo_managed_identity_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-azdo-managed-identity-rg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            IAC Prefix Identity
          </label>
          <input
            type="text"
            name="azdo_managed_identity_iac_prefix"
            value={formData.azdo_managed_identity_iac_prefix}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder='e.g. azdo-${var.env}-pagopa-iac'
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">VNET Name</label>
          <input
            type="text"
            name="vnet_name"
            value={formData.vnet_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-vnet"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">VNET RG Name</label>
          <input
            type="text"
            name="vnet_rg_name"
            value={formData.vnet_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-vnet-rg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Nome prodotto</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. pagopa"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
          >
            <option value="">Select location</option>
            <option value="westeurope">West Europe</option>
            <option value="italynorth">Italy North</option>
            <option value="northeurope">North Europe</option>
          </select>
        </div>
        <div className="flex gap-4 mt-3">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="bg-zinc-700 hover:bg-zinc-600 transition text-zinc-200 px-4 py-2 rounded w-1/2"
          >
            Indietro
          </button>
          <button
            type="button"
            onClick={() => setShowSummary(true)}
            className="bg-pink-600 hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2"
          >
            Genera IDH Domain
          </button>
        </div>
      </div>
    </div>
  );

  const steps = [step1, step2, step3];

  // Genera un esempio di modulo Terraform a partire dai dati inseriti
  function renderTerraformPreview(data: FormData) {
    return (
      <pre className="mt-4 bg-zinc-950 text-green-400 rounded-lg p-4 overflow-auto text-xs border border-zinc-700 whitespace-pre-wrap">
{`module "idh" {
  source = "./modules/idh"
  domain_name = "${data.domain_name}"
  is_dev_public = ${data.is_dev_public}
  storage_account_state_name = "${data.storage_account_state_name}"
  storage_account_container_state_name = "${data.storage_account_container_state_name}"
  subscription = "${data.subscription}"
  log_analytics_ws_name = "${data.log_analytics_ws_name}"
  log_analytics_ws_rg_name = "${data.log_analytics_ws_rg_name}"
  monitor_rg_name = "${data.monitor_rg_name}"
  monitor_action_group_slack_name = "${data.monitor_action_group_slack_name}"
  monitor_action_group_email_name = "${data.monitor_action_group_email_name}"
  monitor_action_group_opsgenie_name = "${data.monitor_action_group_opsgenie_name}"
  azdo_managed_identity_rg_name = "${data.azdo_managed_identity_rg_name}"
  azdo_managed_identity_iac_prefix = "${data.azdo_managed_identity_iac_prefix}"
  vnet_name = "${data.vnet_name}"
  vnet_rg_name = "${data.vnet_rg_name}"
  product_name = "${data.product_name}"
  location = "${data.location}"
}
`}
      </pre>
    );
  }


  return (
    <div className="flex gap-6 p-6 mx-auto max-w-5xl">
      <div className={`w-64 bg-zinc-900 p-4 rounded-2xl shadow-2xl border border-zinc-700 h-fit ${step === 1 ? 'hover:shadow-indigo-500/10' : step === 2 ? 'hover:shadow-emerald-500/10' : 'hover:shadow-pink-500/10'} transition-all`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${step === 1 ? 'text-indigo-400' : step === 2 ? 'text-emerald-400' : 'text-pink-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
          </svg>
          Components
        </h3>
        {['PostgreSQL', 'Network', 'Redis', 'Storage Account', 'Key Vault'].map((component) => (
        <div key={component} className="flex items-center mb-3 hover:bg-zinc-800 p-2 rounded cursor-pointer transition-all group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id={component}
              checked={selectedComponents.includes(component)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedComponents([...selectedComponents, component]);
                } else {
                  setSelectedComponents(selectedComponents.filter(c => c !== component));
                }
              }}
              className={`peer w-4 h-4 appearance-none border border-zinc-600 rounded bg-zinc-900 ${step === 1 ? 'checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-500' : step === 2 ? 'checked:bg-emerald-600 checked:border-emerald-600 hover:border-emerald-500 ' : 'checked:bg-pink-600 checked:border-pink-600 hover:border-pink-500'} transition-colors`}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <label htmlFor={component} style={{ cursor: 'pointer' }} className={`text-zinc-300 text-sm ${step === 1 ? 'group-hover:text-indigo-400' : step === 2 ? 'group-hover:text-emerald-400' : 'group-hover:text-pink-400'} transition-colors select-none ml-2`}>{component}</label>
        </div>
      ))}
      </div>
      <div className={`p-6 flex-1 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 ${step === 1 ? 'hover:shadow-indigo-500/10' : step === 2 ? 'hover:shadow-emerald-500/10' : 'hover:shadow-pink-500/10'} transition-shadow`}>
      <h1 className={`text-3xl font-bold mb-4 text-center ${step === 1 ? 'text-indigo-400' : step === 2 ? 'text-emerald-400' : 'text-pink-400'} drop-shadow`}>
        Wizard modulo Terraform IDH
      </h1>
      {!showSummary ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            setShowSummary(true);
          }}
        >
          <div className="mb-8 flex items-center justify-center gap-3">
            {[1,2,3].map(n=>(
              <div
                key={n}
                style={{ cursor: 'pointer' }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base font-bold shadow-md transition
                  ${
                    step === n
                      ? "border-white-400 bg-white-500/20 text-white-100 scale-110"
                      : "border-zinc-600 bg-zinc-800 text-zinc-500"
                  }`}
                title={`Passo ${n}`}
                onClick={() => setStep(n)}
              >{n}</div>
            ))}
          </div>
          {steps[step-1]}
        </form>
      ) : (
        <div className="p-6 rounded-2xl bg-zinc-800 border border-emerald-800 shadow-inner hover:shadow-emerald-500/10 transition-shadow">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-3">
            Anteprima modulo Terraform (IDH)
          </h2>
          <div className="text-zinc-200 mb-2 text-sm">
            Copia il codice qui sotto ed usalo come modulo IDH!
          </div>
          {renderTerraformPreview(formData)}
          <button
            className="mt-6 bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded shadow"
            onClick={() => setShowSummary(false)}
          >
            Torna al wizard
          </button>
          <button
            className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow float-right flex items-center gap-2 group transition-all hover:scale-[1.02]"
            onClick={async () => {
              if (typeof window !== 'undefined') {
                const modal = document.createElement('dialog');
                modal.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg bg-zinc-800 border border-zinc-600 text-white shadow-xl';
                modal.innerHTML = `
                  <h2 class="text-xl font-bold mb-4">Generazione in corso</h2>
                  <p class="mb-4">Run github workflow...</p>
                  <a class="mb-4 text-pink-400 hover:text-pink-500 transition-colors underline flex items-center gap-2" target="_blank" type="button" href="https://github.com/ffppa/test-runners/actions/workflows/test-wk.yml">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd"/>
                    </svg>
                    Guarda qui
                  </a>
                  <br>
                  <div class="animate-spin w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full mx-auto"></div>
                `;
                document.body.appendChild(modal);
                modal.showModal();

                let responseData: any = null;
                let duration = 0;

                try {
                  const startTime = Date.now();

                  const response = await fetch('/api/github-dispatch', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      formData: formData
                    })
                  });

                  responseData = await response.json();
                  duration = Date.now() - startTime;

                  // Log per debug
                  console.log('Request ID:', responseData?.requestId);
                  console.log('Response OK:', response.ok);

                  // Aggiorna il Request ID nella modale se presente
                  if (responseData && responseData.requestId) {
                    const requestIdElement = modal.querySelector('#request-id') as HTMLElement;
                    if (requestIdElement) {
                      requestIdElement.textContent = responseData.requestId;
                    }
                  }

                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                } catch (error) {
                  console.error('Trace:', error);
                } finally {
                  setTimeout(() => {
                    modal.close();
                    modal.remove();

                    const successModal = document.createElement('dialog');
                    successModal.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg bg-emerald-800 border border-emerald-600 text-white shadow-xl max-w-md w-full';
                    successModal.innerHTML = `
                      <h2 class="text-xl font-bold mb-4">Completato!</h2>
                      <div class="mb-4 p-3 bg-emerald-700 rounded-md border border-emerald-500">
                        <p class="text-sm text-emerald-200">Request ID:</p>
                        <p class="font-mono text-xs text-white">${responseData?.requestId || 'N/A'}</p>
                      </div>
                      <p class="mb-4">Il modulo è stato mandato in generazione! </p>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      <div class="mt-4 text-center">
                        <p class="text-xs text-emerald-200">Durata: ${duration}ms</p>
                      </div>
                    `;
                    document.body.appendChild(successModal);
                    successModal.showModal();

                    setTimeout(() => {
                      successModal.close();
                      successModal.remove();
                    }, 5000);
                  }, 2000);
                }
            }
          }
        }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-spin" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Genera!
          </button>
        </div>
      )}
      </div>
    </div>
  );
}