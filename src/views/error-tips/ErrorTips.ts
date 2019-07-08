import { ExceptionCard } from '@/components';

import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: { ExceptionCard }
})
class ErrorTips extends Vue {
    @Prop({ default: 404 })
    private code!: number;

    @Prop()
    private msg!: string;

    private activated() {}

    private mounted() {}

    private beforeDestroy() {}
}

export default ErrorTips;
