<script lang="ts">
    import { Quit } from "../../wailsjs/runtime/runtime";
    import { Exit } from "../../wailsjs/go/main/App";
    import { t } from "../i18n";
    
    const close = () => {
        Exit()
        Quit()
    }
</script>

<div class="overlay">
    <button class="overlay__close-button" on:click={close}> {$t("close")} </button>
    <span class="overlay__title">hys - statview</span>
</div>

<style>
    .overlay {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
    
    .overlay__close-button,
    .overlay__title {
        padding: 0.3rem 0.5rem;
        opacity: 0.5;
    }
    .overlay__close-button {
        cursor: pointer;
        background: rgba(0,0,0,0);
    }
</style>