import editIcon from "~/assets/edit.svg";
import insertIcon from "~/assets/insert.svg";
import genIcon from "~/assets/generate.svg";
import reGenIcon from "~/assets/regenerate.svg";

class ChatGPTWriter {
  // Declare private properties with non-null assertion
  private modal!: HTMLDivElement;
  private modalContent!: HTMLDivElement;
  private generateBtn!: HTMLButtonElement;
  private insertBtn!: HTMLButtonElement;
  private inputText!: HTMLInputElement;
  private messagesDiv!: HTMLDivElement;
  private lastGeneratedMessage: string = "";
  private parentElement: HTMLElement | null = null;
  private messageCount: number = 1;

  constructor() {
    this.createModal(); // Create and append modal HTML to the document
    this.initializeElements(); // Initialize class properties with DOM elements
    this.setupEventListeners(); // Set up event listeners for user interactions
  }


  private createModal() {
    const modalHtml = `
      <div id="cgw-modal" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 4000;">
        <div id="cgw-modal-content" style="background: white; border-radius: 8px; width: 100%; max-width: 570px; padding: 20px;">
          <div id="cgw-messages" style="margin-top: 10px; max-height: 200px; overflow-y: auto; padding: 10px; display: flex; flex-direction: column;"></div>
          <div style="margin-bottom: 10px;">
            <input id="cgw-input-text" type="text" placeholder="Enter your prompt..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"/>
          </div>
          <div style="text-align: right; margin-top: 12px;">
            <button id="cgw-insert-btn" style="background: #fff; color: #666D80; padding: 8px 16px; border: 2px solid #666D80; border-radius: 4px; cursor: pointer; display: none; margin-right: 10px;">
              <img src="${insertIcon}" alt="Insert" style="vertical-align: middle; margin-right: 5px; width: 14px; height: 14px;"> 
              <b>Insert</b>
            </button>
            <button id="cgw-generate-btn" style="background: #007bff; color: white; padding: 8px 16px; border: 2px solid #007bff; border-radius: 4px; cursor: pointer;">
              <img src="${genIcon}" alt="Generate" style="vertical-align: middle; margin-right: 5px; width: 14px; height: 14px"> 
              <b>Generate</b>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml); // Append modal HTML to body
  }

  private initializeElements() {
    // Initialize class properties by querying DOM elements using cgw-(ChatGPTWriter) prefixed IDs
    this.modal = document.getElementById("cgw-modal") as HTMLDivElement;
    this.modalContent = document.getElementById("cgw-modal-content") as HTMLDivElement;
    this.generateBtn = document.getElementById("cgw-generate-btn") as HTMLButtonElement;
    this.insertBtn = document.getElementById("cgw-insert-btn") as HTMLButtonElement;
    this.inputText = document.getElementById("cgw-input-text") as HTMLInputElement;
    this.messagesDiv = document.getElementById("cgw-messages") as HTMLDivElement;
  }
  // Set up event listeners for document clicks and button interactions
  private setupEventListeners() {
    document.addEventListener("click", this.handleDocumentClick.bind(this));
    this.generateBtn.addEventListener("click", this.handleGenerateClick.bind(this));
    this.insertBtn.addEventListener("click", this.handleInsertClick.bind(this));
  }
  // Handle clicks on the document to manage edit icon creation and modal closing
  private handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.handleEditIconCreation(target);
    this.handleModalClose(target);
  }

  // Create edit icon when clicking on specific LinkedIn message elements
  private handleEditIconCreation(target: HTMLElement) {
    if (
      target.matches(".msg-form__contenteditable") ||
      target.matches(".msg-form__contenteditable > p")
    ) {
      this.parentElement =
        target.closest(".msg-form__container") ||
        target.closest(".msg-form__contenteditable > p");
      if (this.parentElement && !this.parentElement.querySelector(".edit-icon")) {
        const icon = this.createEditIcon();
        this.parentElement.appendChild(icon);
      }
    }
  }

  // Create and style the edit icon, adding click event to open modal
  private createEditIcon(): HTMLImageElement {
    const icon = document.createElement("img");
    icon.className = "edit-icon";
    icon.src = editIcon;
    icon.alt = "Custom Icon";
    Object.assign(icon.style, {
      position: "absolute",
      bottom: "5px",
      right: "5px",
      width: "30px",
      height: "30px",
      cursor: "pointer",
      zIndex: "1000",
    });
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.modal.style.display = "flex";
    });
    return icon;
  }

  // Close the modal when clicking outside of it
  private handleModalClose(target: HTMLElement) {
    if (
      this.modal.style.display === "flex" &&
      !this.modalContent.contains(target) &&
      !target.classList.contains("edit-icon")
    ) {
      this.modal.style.display = "none";
      this.generateBtn.textContent = "Generate";
      this.insertBtn.style.display = "none";
    }
  }

  // Handle generate button click to create and display messages
  private handleGenerateClick(e: Event) {
    e.stopPropagation();
    const inputValue = this.inputText.value.trim();
    if (!inputValue) return;

    this.appendMessage(inputValue, true);
    this.setGenerateButtonLoading();

    // Simulate API call with setTimeout
    setTimeout(() => {
      this.lastGeneratedMessage = this.generateMessage();
      this.appendMessage(this.lastGeneratedMessage, false);
      this.updateGenerateButton();
      this.inputText.value = "";
      this.insertBtn.style.display = "inline-block";
    }, 500);
  }

  // Append a new message to the messages div
  private appendMessage(message: string, isUser: boolean) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    Object.assign(messageDiv.style, {
      // ... style properties ...
      backgroundColor: isUser ? "#DFE1E7" : "#DBEAFE",
      color: "#666D80",
      borderRadius: "12px",
      padding: "10px",
      marginBottom: "5px",
      textAlign: isUser ? "right" : "left",
      maxWidth: "80%",
      alignSelf: isUser ? "flex-end" : "flex-start",
      marginLeft: isUser ? "auto" : "0",
      marginRight: isUser ? "0" : "auto",
    });
    this.messagesDiv.appendChild(messageDiv);
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  }

  // Set generate button to loading state
  private setGenerateButtonLoading() {
    this.generateBtn.disabled = true;
    this.generateBtn.textContent = "Loading...";
    this.generateBtn.style.backgroundColor = "#666D80";
  }

  // Update generate button after message generation
  private updateGenerateButton() {
    this.generateBtn.disabled = false;
    this.generateBtn.style.backgroundColor = "#007bff";
    this.generateBtn.style.color = "white";
    this.generateBtn.innerHTML = `<img src="${reGenIcon}" alt="Regenerate" style="vertical-align: middle; margin-right: 5px; width: 16px; height: 16px"> <b>Regenerate</b>`;
  }

  // Generate a message (currently returns a static message)
  private generateMessage(): string {
    const messages = [
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
    ];
    return messages[this.messageCount++ % messages.length];
  }

  // Handle insert button click to add generated message to LinkedIn message box
  private handleInsertClick() {
    if (this.lastGeneratedMessage && this.parentElement) {
      const messageParagraph = document.createElement("p");
      messageParagraph.textContent = this.lastGeneratedMessage;
      this.parentElement.appendChild(messageParagraph);
      this.insertBtn.style.display = "none";
      this.modal.style.display = "none";
    }
  }
}
// Define content script for LinkedIn pages
export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    new ChatGPTWriter();
  },
});
