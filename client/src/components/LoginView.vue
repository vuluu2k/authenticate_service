<template>
    <div id="main">
        <form action="" id="form">
            <h2>{{ title }}</h2>
            <div class="block__input">
                <input
                    type="text"
                    class="from__input"
                    id="email__input"
                    name="methodlogin"
                    placeholder="Nhap email/sdt/username"
                />
                <p class="error__message"></p>
            </div>
            <div class="block__input">
                <div>
                    <input
                        type="password"
                        class="from__input"
                        id="password__input"
                        name="password"
                        placeholder="Nhap password"
                    />
                    <!-- icon -->
                </div>
                <p class="error__message"></p>
            </div>
            <button type="submit">Login</button>
            <ul class="form__options">
                <li>
                    <a href="#">Quen mat khau</a>
                </li>
                <li>
                    <a href="#">dang nhap voi sms</a>
                </li>
            </ul>
            <ul class="method__login">
                <li>
                    <button>
                        <!-- icon -->
                        Facebook
                    </button>
                </li>
                <li>
                    <button>
                        <!-- icon -->
                        Google
                    </button>
                </li>
            </ul>
            <p>ban moi dang ki shoppe? <a href="#">Login</a></p>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Login',
        };
    },
};
</script>
