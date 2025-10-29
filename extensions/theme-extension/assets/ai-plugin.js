document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".ai-generate-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const blockId = btn.dataset.blockId;
      const resultDiv = document.getElementById(`ai-result-${blockId}`);
      const promptInput = document.getElementById(`ai-prompt-${blockId}`);
      const prompt = promptInput?.value || "AI Generated Image";

      resultDiv.innerHTML = "<p>Generating image... Please wait.</p>";

      try {
        const response = await fetch("https://api.ardix.ai/api/v1/ai/pod/image-gen?plan=FREE", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            style: "Cyberpunk",
            ratio: "1:1",
            color: "#000000"
          }),
        });

        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();

        if (data?.data?.jobId) {
          // Wait or fetch job result
          resultDiv.innerHTML = `<p>Job created: ${data.data.jobId}. Fetching result...</p>`;
          
          // Poll for completion
          const imageUrl = await pollForResult(data.data.jobId);
          resultDiv.innerHTML = `<img src="${imageUrl}" alt="AI Generated" style="max-width:100%;border-radius:8px;">`;
        } else if (data?.image_url) {
          // Direct image response
          resultDiv.innerHTML = `<img src="${data.image_url}" alt="AI Generated" style="max-width:100%;border-radius:8px;">`;
        } else {
          resultDiv.innerHTML = `<p style="color:red;">No image returned. Try again.</p>`;
        }
      } catch (err) {
        console.error(err);
        resultDiv.innerHTML = `<p style="color:red;">Error generating image. Try again.</p>`;
      }
    });
  });
});

async function pollForResult(jobId) {
  const pollUrl = `https://api.ardix.ai/api/v1/ai/pod/image-gen/status/${jobId}`;
  for (let i = 0; i < 20; i++) {
    const res = await fetch(pollUrl);
    const data = await res.json();
    if (data?.data?.image_url) return data.data.image_url;
    await new Promise((r) => setTimeout(r, 3000)); // wait 3s before retry
  }
  throw new Error("Timed out waiting for image");
}
