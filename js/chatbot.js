window.watsonAssistantChatOptions = {
    integrationID: "affeaa2d-5c04-4dc1-9506-639014705cf2", // The ID of this integration.
    region: "us-east", // The region your integration is hosted in.
    serviceInstanceID: "f8653a3d-b899-4d4d-bb1e-a60bc4d1aafb", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });